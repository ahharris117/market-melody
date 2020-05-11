require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user) }

  describe "GET#index" do
    it "returns a successful response status and json content" do
      sign_in user1
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns info about the current user" do
      sign_in user1
      get :index

      response_body = JSON.parse(response.body)

      expect(response_body.length).to eq 1
      expect(response_body["user"]["id"]).to eq user1.id
      expect(response_body["user"]["username"]).to eq user1.username
      expect(response_body["user"]["email"]).to eq user1.email

      expect(response_body["user"]["id"]).to_not eq user2.id
      expect(response_body["user"]["username"]).to_not eq user2.username
      expect(response_body["user"]["email"]).to_not eq user2.email
    end

    it "returns empty if there is no current user" do
      get :index

      response_body = JSON.parse(response.body)
      expect(response_body).to be nil
    end
  end

  describe "GET#show" do
    it "returns a successful response status and json content" do
      get :show, params: { id: user1.id }

      response_body = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns a user based on the id param" do
      get :show, params: { id: user1.id }

      response_body = JSON.parse(response.body)

      expect(response_body.length).to eq 1
      expect(response_body["user"]["id"]).to eq user1.id
      expect(response_body["user"]["username"]).to eq user1.username
      expect(response_body["user"]["email"]).to eq user1.email
    end
  end
end
