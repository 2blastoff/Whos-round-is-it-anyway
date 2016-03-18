require 'rails_helper'
include Capybara::Angular::DSL


feature 'user registration', type: :request do
  scenario 'valid POST to /users adds user to database' do
    expect{ register_user }.to change{ User.count }.by 1
    expect(response.status).to eq 201
  end
end
