require 'rails_helper'

RSpec.describe Melody, type: :model do
  it { should belong_to(:scale) }
  it { should belong_to(:user) }
  it { should belong_to(:stock) }

  describe "#get_melody" do
    it "returns a 36 note melody array" do
      user = FactoryBot.create(:user)
      scale = Scale.create(name: "A Mixolydian", notes: "D2 E2 F#2 G2 A2 B2 C#3 D3 E3 F#3 G3 A3 B3 C#4 D4 E4 F#4 G4 A4 B4 C#5 D5 E5 F#5")
      stock = Stock.create(
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
          {"date"=>"2019-09-06", "price"=>"134.8500"}],
          name: "InternationalBM"
      )
      melody = Melody.create(user: user, scale: scale, stock: stock)

      expect(melody.get_melody).to be_an_instance_of(Array)
      expect(melody.get_melody.length).to eq 36
    end
  end
end
