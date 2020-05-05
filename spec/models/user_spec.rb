require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid with valid email, screen name, and password" do
    user = User.new(
      email: "test@example.com",
      username: "tester",
      password: "password"
    )

    expect(user).to be_valid
  end

  it "is not valid without an email" do
    user = User.new(
      email: "",
      username: "tester",
      password: "password"
    )

    expect(user).to_not be_valid
    expect(user.errors.full_messages.to_sentence).to eq("Email can't be blank")
  end

  it "is not valid without a username" do
    user = User.new(
      email: "test@example.com",
      username: "",
      password: "password"
    )

    expect(user).to_not be_valid
    expect(user.errors.full_messages.to_sentence).to eq("Username can't be blank")
  end

  it "is not valid without a password" do
    user = User.new(
      email: "test@example.com",
      username: "tester",
      password: ""
    )

    expect(user).to_not be_valid
    expect(user.errors.full_messages.to_sentence).to eq("Password can't be blank")
  end

  it "is not valid without a unique email" do
    user1 = User.create(
      email: "test@example.com",
      username: "tester",
      password: "password"
    )

    user2 = User.new(
      email: "test@example.com",
      username: "tester2",
      password: "password"
    )

    expect(user2).to_not be_valid
    expect(user2.errors.full_messages.to_sentence).to eq("Email has already been taken")
  end

  it "is not valid without a unique Username" do
    user1 = User.create(
      email: "test@example.com",
      username: "tester",
      password: "password"
    )

    user2 = User.new(
      email: "test2@example.com",
      username: "tester",
      password: "password"
    )

    expect(user2).to_not be_valid
    expect(user2.errors.full_messages.to_sentence).to eq("Username has already been taken")
  end

  it "is not valid without a password that is at least 6 characters" do
    user = User.create(
      email: "test@example.com",
      username: "tester",
      password: "test"
    )

    expect(user).to_not be_valid
    expect(user.errors.full_messages.to_sentence).to eq("Password is too short (minimum is 6 characters)")
  end

  it { should have_many(:melodies) }
end
