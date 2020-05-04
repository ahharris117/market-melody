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

    price_array = []

    counter = 1
    parsed_response["Weekly Time Series"].each do |key, value|
      if counter <= 36
        price_array.push(value["1. open"].to_f)
        counter += 1
      elsif counter > 36
        break
      end
    end

    price_string = price_array.join(' ')

    stock = Stock.create(symbol: params[:stock], prices: price_string)
    @melody = Melody.new
    if user_signed_in?
      @melody.user = current_user
    end
    
    @melody.stock = stock
    @melody.scale = Scale.find_by(name: params[:scale])
    render json: @melody.get_melody
  end

  def show
    melody = Melody.find(params[:id])
  end
end
