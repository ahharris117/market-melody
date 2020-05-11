require "rails_helper"

RSpec.describe Api::V1::LikesController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:scale1) { Scale.create(name: "A Minor", notes: "D2 E2 F2 G2 A2 B2 C3 D3 E3 F3 G3 A3 B3 C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5") }
  let!(:scale2) { Scale.create(name: "A Harmonic Minor", notes: "D2 E2 F2 G#2 A2 B2 C3 D3 E3 F3 G#3 A3 B3 C4 D4 E4 F4 G#4 A4 B4 C5 D5 E5 F5") }
  let!(:scale3) { Scale.create(name: "A Wholetone", notes: "B2 C#2 D#2 F2 G2 A2 B2 C3 D#3 F3 G3 A3 B3 C#4 D#4 F4 G4 A4 B4 C#5 D#5 F5 G5") }
  let!(:stock1) {
    Stock.create(
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
        name: "InternationalBM",
        interval: "Daily"
    ) }
  let!(:melody1) { Melody.create(user: user1, scale: scale1, stock: stock1) }
  let!(:melody2) { Melody.create(user: user1, scale: scale2, stock: stock1) }
  let!(:melody3) { Melody.create(user: user1, scale: scale3, stock: stock1) }
  let!(:like1) { Like.create(user: user1, melody: melody1) }
  let!(:like2) { Like.create(user: user1, melody: melody2) }

  describe "DELETE#destroy" do
    it "removes specified like from the database" do
      sign_in user1

      previous_count = Like.count
      delete :destroy, params: {id: like1.id }
      new_count = Like.count

      expect(new_count).to eq (previous_count - 1)
    end

    it "returns all melodies, likes and current user likes" do
      sign_in user1

      delete :destroy, params: {id: like1.id }
      response_body = JSON.parse(response.body)

      expect(response_body["melodies"]["melodies"]).to be_kind_of(Array)
      expect(response_body["melodies"]["melodies"][0]["id"]).to eq melody1.id
      expect(response_body["currentUser"]["id"]).to eq user1.id
      expect(response_body["currentUserLikes"]).to be_kind_of(Array)
      expect(response_body["currentUserLikes"][0]["id"]).to eq like2.id
    end
  end

  describe "POST#create" do
    it "adds a new like to the database" do
      sign_in user1

      previous_count = Like.count
      post :create, params: { melody_id: melody3.id, user_id: user1.id}
      new_count = Like.count

      expect(new_count).to eq (previous_count + 1)
    end

    it "returns all melodies, likes and current user likes" do
      sign_in user1

      post :create, params: { melody_id: melody3.id, user_id: user1.id}
      response_body = JSON.parse(response.body)

      expect(response_body["melodies"]["melodies"]).to be_kind_of(Array)
      expect(response_body["melodies"]["melodies"][0]["id"]).to eq melody1.id
      expect(response_body["currentUser"]["id"]).to eq user1.id
      expect(response_body["currentUserLikes"]).to be_kind_of(Array)
      expect(response_body["currentUserLikes"].length).to eq 3
    end
  end
end
