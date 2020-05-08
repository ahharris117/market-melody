require "rails_helper"

feature "profile photo" do
  pending "user uploads a profile photo" do
    visit root_path
    click_link "Sign Up"

    fill_in "Email", with: "abc@gmail.com"
    fill_in "Username", with: "abc"
    fill_in "Password", with: "123456"
    fill_in "Password confirmation", with: "123456"
    attach_file :user_profile_photo, "#{Rails.root}/spec/support/images/photo.png"
    click_button "Sign up"

    expect(page).to have_content("Welcome! You have signed up successfully.")
    expect(page).to have_css("img[src*='photo.png']")
  end
end
