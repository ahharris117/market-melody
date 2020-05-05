require 'rails_helper'

RSpec.describe Stock, type: :model do
  before(:all) do
    @before_all_stock = Stock.create(
      symbol: "IBM",
      prices: [{"date"=>"2020-05-04", "price"=>"120.8200"},
        {"date"=>"2020-05-01", "price"=>"125.5600"},
        {"date"=>"2020-04-24", "price"=>"119.1500"},
        {"date"=>"2020-04-17", "price"=>"121.6300"},
        {"date"=>"2020-04-09", "price"=>"110.3500"},
        {"date"=>"2020-04-03", "price"=>"108.0900"},
        {"date"=>"2020-03-27", "price"=>"94.6000"},
        {"date"=>"2020-03-20", "price"=>"98.0000"},
        {"date"=>"2020-03-13", "price"=>"120.1600"},
        {"date"=>"2020-03-06", "price"=>"130.7500"},
        {"date"=>"2020-02-28", "price"=>"145.5100"},
        {"date"=>"2020-02-21", "price"=>"149.7900"},
        {"date"=>"2020-02-14", "price"=>"152.9700"},
        {"date"=>"2020-02-07", "price"=>"144.2500"},
        {"date"=>"2020-01-31", "price"=>"138.5000"},
        {"date"=>"2020-01-24", "price"=>"137.8100"},
        {"date"=>"2020-01-17", "price"=>"135.4800"},
        {"date"=>"2020-01-10", "price"=>"133.4200"},
        {"date"=>"2020-01-03", "price"=>"135.2000"},
        {"date"=>"2019-12-27", "price"=>"135.7800"},
        {"date"=>"2019-12-20", "price"=>"134.9400"},
        {"date"=>"2019-12-13", "price"=>"133.3500"},
        {"date"=>"2019-12-06", "price"=>"134.4500"},
        {"date"=>"2019-11-29", "price"=>"134.4700"},
        {"date"=>"2019-11-22", "price"=>"134.3000"},
        {"date"=>"2019-11-15", "price"=>"137.2000"},
        {"date"=>"2019-11-08", "price"=>"136.2400"},
        {"date"=>"2019-11-01", "price"=>"136.0000"},
        {"date"=>"2019-10-25", "price"=>"132.6100"},
        {"date"=>"2019-10-18", "price"=>"142.3100"},
        {"date"=>"2019-10-11", "price"=>"142.2600"},
        {"date"=>"2019-10-04", "price"=>"143.7300"},
        {"date"=>"2019-09-27", "price"=>"141.1900"},
        {"date"=>"2019-09-20", "price"=>"142.5600"},
        {"date"=>"2019-09-13", "price"=>"140.5900"},
        {"date"=>"2019-09-06", "price"=>"134.8500"}]
    )
  end
  
  it { should have_one(:melody) }
  it { should validate_presence_of(:symbol) }
  it { should validate_presence_of(:prices) }

  describe "#get_price_array" do
    it "returns an array of price values from prices json" do

      expect(@before_all_stock.get_price_array.length).to eq 36
      expect(@before_all_stock.get_price_array).to be_an_instance_of(Array)
      expect(@before_all_stock.get_price_array[0]).to be_a(Float)
    end
  end
  describe "#get_date_array" do
    it "returns an array of date values from prices json" do

      expect(@before_all_stock.get_date_array.length).to eq 36
      expect(@before_all_stock.get_date_array).to be_an_instance_of(Array)
      expect(@before_all_stock.get_date_array[0]).to be_a(String)
    end
  end

  describe "#range_and_low" do
    it "returns the range divided by 12 and lowest price" do

      expect(@before_all_stock.range_and_low.length).to eq 2
      expect(@before_all_stock.range_and_low).to be_an_instance_of(Array)
      expect(@before_all_stock.range_and_low[0]).to eq @before_all_stock.get_price_array.min
      expect(@before_all_stock.range_and_low[1]).to eq (@before_all_stock.get_price_array.max - @before_all_stock.get_price_array.min) / 12
    end
  end

  describe "#index" do
    it "returns an array of integers" do

      expect(@before_all_stock.index.length).to eq 36
      expect(@before_all_stock.index).to be_an_instance_of(Array)
      expect(@before_all_stock.index[0]).to be_a(Integer)
      expect(@before_all_stock.index.max).to be < 13
      expect(@before_all_stock.index.min).to be > 0
    end
  end
end
