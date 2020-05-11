require "rails_helper"

RSpec.describe Api::V1::StocksController, type: :controller do
  describe "GET#index" do
    it "makes a request to the external api to get stock data" do
      VCR.use_cassette("get stock name") do
        get :index, params: { stock: 'B'}
        returned_json = JSON.parse(response.body)

        expect(returned_json["bestMatches"]).to be_kind_of(Array)
        expect(returned_json["bestMatches"][0].length).to eq 9
        expect(returned_json["bestMatches"][0]).to have_key("1. symbol")
        expect(returned_json["bestMatches"][0]).to have_key("2. name")
        expect(returned_json["bestMatches"][0]).to have_key("3. type")
        expect(returned_json["bestMatches"][0]).to have_key("4. region")
        expect(returned_json["bestMatches"][0]).to have_key("5. marketOpen")
        expect(returned_json["bestMatches"][0]).to have_key("6. marketClose")
        expect(returned_json["bestMatches"][0]).to have_key("7. timezone")
        expect(returned_json["bestMatches"][0]).to have_key("8. currency")
        expect(returned_json["bestMatches"][0]).to have_key("9. matchScore")
      end
    end
  end
end
