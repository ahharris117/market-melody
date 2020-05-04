require 'faraday'
class Api::V1::StocksController < ApplicationController
  def index
    secret_key = ENV["api_key"]
    ticker_name = params[:stock]
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=#{ticker_name}&apikey=#{secret_key}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)
    counter = 1
    price_array = []
    parsed_response["Weekly Time Series"].each do |key, value|
      if counter <= 36
        price_array.push(value["1. open"].to_f)
        counter += 1
      elsif counter > 36
        break
      end
    end
    high = price_array.max
    low = price_array.min
    range = (high - low) / 12
    note_array = price_array.map do |number|
      if number - low > 0
        number = (number - low) / range
        number.ceil
      else
        number = (number - low + 0.1) / range
        number.ceil
      end
    end
    root_index = 11
    a_minor_notes = ["D2","E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5" ]
    a_harm_minor_notes = ["D2","E2", "F2", "G#2", "A2", "B2", "C3", "D3", "E3", "F3", "G#3", "A3", "B3", "C4", "D4", "E4", "F4", "G#4", "A4", "B4", "C5", "D5", "E5", "F5" ]
    a_meld_minor_notes = ["D2","E2", "F#2", "G#2", "A2", "B2", "C3", "D3", "E3", "F3", "G#3", "A3", "B3", "C4", "D4", "E4", "F#4", "G#4", "A4", "B4", "C5", "D5", "E5", "F#5" ]

    melody = note_array.map do |number|
      if note_array.first > root_index
        diff = note_array.first - root_index
        number = a_harm_minor_notes[number - diff]
      elsif note_array.first < root_index
        diff = root_index - note_array.first
        number = a_harm_minor_notes[number + diff]
      else
        number = a_meld_minor_notes[number]
      end
    end
    final_melody = melody.reverse()

    render json: final_melody
  end
end
