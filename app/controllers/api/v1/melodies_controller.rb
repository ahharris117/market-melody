require 'faraday'

class Api::V1::MelodiesController < ApplicationController
  protect_from_forgery with: :null_session
  protect_from_forgery unless: -> { request.format.json? }

  def index
    secret_key = ENV["api_key"]

    stock_info = params[:stock].split(' - ')
    ticker_name = stock_info[0]
    stock_name = stock_info[1]
    url = ""
    series = ""
    if params[:interval] == "Weekly"
      series = "Weekly Time Series"
      url = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=#{ticker_name}&apikey=#{secret_key}"
    elsif params[:interval] == "Daily"
      series = "Time Series (Daily)"
      url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{ticker_name}&apikey=#{secret_key}"
    else
      series = "Monthly Time Series"
      url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=#{ticker_name}&apikey=#{secret_key}"
    end
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)

    if parsed_response["Error Message"]
      render json: { status: 'error', message: "Invalid symbol" }, status: 500
    elsif parsed_response["Note"]
      render json: { status: 'error', message: "Too many API calls" }, status: 500
    elsif parsed_response[series].length < 36
      render json: { status: 'error', message: "Not enough data, stock must have at least 36 data points" }, status: 500
    else
      stock_data = []
      counter = 1
      parsed_response[series].each do |key, value|
        if counter <= 36
          stock_data.push({
            "date" => key,
            "price" => value["1. open"]
          })
          counter += 1
        else
          break
        end
      end

      stock = Stock.new(symbol: ticker_name, prices: stock_data, name: stock_name, interval: params[:interval])
      @melody = Melody.new
      if user_signed_in?
        @melody.user = current_user
      end

      @melody.stock = stock
      @melody.scale = Scale.find_by(name: params[:scale])
      render json: {
        melody: @melody.get_melody,
        name: @melody.get_name,
        dates: stock.get_date_array,
        prices: stock.get_price_array,
        interval: stock.interval,
        user: current_user,
        fullMelody: @melody,
        stock: stock
      }
    end
  end

  def create
    params.permit!
    melody = Melody.new(params[:fullMelody])
    stock = Stock.new(params[:stock])
    melody.stock = stock
    melody.save
    stock.save
    response = melody.id
    render json: response
  end

  def show
    melody = Melody.find(params[:id])
    stock = melody.stock
    render json: {
      name: melody.get_name,
      melody: melody.get_melody,
      stock: stock,
      prices: stock.get_price_array,
      dates: stock.get_date_array,
      user: current_user,
    }
  end
end
