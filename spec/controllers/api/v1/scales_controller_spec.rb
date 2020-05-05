require "rails_helper"

RSpec.describe Api::V1::ScalesController, type: :controller do
  describe "GET#index" do
    let!(:scale1) { Scale.create(name: "A Minor", notes: "D2 E2 F2 G2 A2 B2 C3 D3 E3 F3 G3 A3 B3 C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5") }
    let!(:scale2) { Scale.create(name: "A Dorian", notes: "D2 E2 F#2 G2 A2 B2 C3 D3 E3 F#3 G3 A3 B3 C4 D4 E4 F#4 G4 A4 B4 C5 D5 E5 F#5") }

    it "returns a successful response status and a content type of json" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns all scales in database" do
      get :index

      response_body = JSON.parse(response.body)

      expect(response_body.length).to eq 2

      expect(response_body[0]["name"]).to eq scale1.name
      expect(response_body[0]["notes"]).to eq scale1.notes

      expect(response_body[1]["name"]).to eq scale2.name
      expect(response_body[1]["notes"]).to eq scale2.notes
    end
  end
end
