class Stock < ApplicationRecord
  has_one :melody

  validates :symbol, presence: true
  validates :prices, presence: true
  validates :name, presence: true
  validates :interval, presence: true , inclusion: { in: %w(Weekly Monthly Daily),
    message: "%{value} is not a valid interval" }

  def get_price_array
    price_array = prices.map do |price_hash|
      price_hash["price"].to_f
    end
    return price_array
  end

  def get_date_array
    date_array = prices.map do |price_hash|
      price_hash["date"]
    end
    return date_array
  end

  def range_and_low
    price_array = get_price_array()
    low_range = []
    max = price_array.max
    low_range << price_array.min
    low_range << (max - low_range[0]) / 12
    return low_range
  end

  def index
    low_range = range_and_low()
    price_array = get_price_array()
    index_array = price_array.map do |number|
      if number - low_range[0] > 0
        number = (number - low_range[0]) / low_range[1]
        number.ceil
      else
        number = (number - low_range[0] + 0.1) / low_range[1]
        number.ceil
      end
    end
    return index_array
  end
end
