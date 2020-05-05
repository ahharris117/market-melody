require 'faraday'

class Api::V1::MelodiesController < ApplicationController
  protect_from_forgery with: :null_session
  protect_from_forgery unless: -> { request.format.json? }

  def create
    secret_key = ENV["api_key"]
    ticker_name = params[:stock]
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=#{ticker_name}&apikey=#{secret_key}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)

    if parsed_response["Error Message"]
      render json: { status: 'error', message: "Invalid symbol" }, status: 500
    elsif parsed_response["Weekly Time Series"].length < 36
      render json: { status: 'error', message: "Not enough data, stock must have at least 36 data points" }, status: 500
    else
      stock_data = []
      counter = 1
      parsed_response["Weekly Time Series"].each do |key, value|
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

      stock = Stock.create(symbol: params[:stock], prices: stock_data)
      @melody = Melody.new
      if user_signed_in?
        @melody.user = current_user
      end

      @melody.stock = stock
      @melody.scale = Scale.find_by(name: params[:scale])
      render json: { melody: @melody.get_melody, name: @melody.get_name }
    end
  end

  def show
    melody = Melody.find(params[:id])
  end
end
