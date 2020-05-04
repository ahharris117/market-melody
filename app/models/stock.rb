class Stock < ApplicationRecord
  has_one :melody

  validates :symbol, presence: true
  validates :prices, presence: true

  def integer_array
    string_array = prices.split(' ')
    price_array = string_array.map { |price| price.to_f }
    return price_array
  end

  def range
    price_array = integer_array()
    low_high_range = []
    max = price_array.max
    low_high_range << price_array.min
    low_high_range << (max - low_high_range[0]) / 12
    return low_high_range
  end

  def index
    low_high_range = range()
    price_array = integer_array()
    index_array = price_array.map do |number|
      if number - low_high_range[0] > 0
        number = (number - low_high_range[0]) / low_high_range[1]
        number.ceil
      else
        number = (number - low_high_range[0] + 0.1) / low_high_range[1]
        number.ceil
      end
    end
    return index_array
  end
end
