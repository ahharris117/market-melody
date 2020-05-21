require 'faraday'
require 'StockHandler'

class Api::V1::MelodiesController < ApplicationController
  protect_from_forgery with: :null_session
  protect_from_forgery unless: -> { request.format.json? }

  def index
    new_stock = StockHandler.new(params, current_user)
    render json: new_stock.render_json()
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
      user: melody.user,
      current_user: current_user
    }
  end

  def destroy
    melody = Melody.find(params[:id])
    melody.delete
    render json: {}, status: :no_content
  end

  def update
    melody = Melody.find(params[:id])
    scale = Scale.find_by(name: params[:scale])
    melody.scale = scale
    melody.save
    render json: {
      name: melody.get_name,
      melody: melody.get_melody
    }
  end
end
