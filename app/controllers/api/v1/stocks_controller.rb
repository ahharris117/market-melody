require 'faraday'

class Api::V1::StocksController < ApplicationController
  protect_from_forgery with: :null_session
  protect_from_forgery unless: -> { request.format.json? }

  def index
    secret_key = ENV["api_key"]
    ticker_name = params[:stock]

    url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=#{ticker_name}&apikey=#{secret_key}"

    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)

    render json: parsed_response
  end
end
