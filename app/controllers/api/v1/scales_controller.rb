class Api::V1::ScalesController < ApplicationController
  def index
    render json: Scale.all
  end
end
