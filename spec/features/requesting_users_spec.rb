require 'rails_helper'

feature 'requesting users', type: :request do
  scenario 'valid GET to /users returns user list in JSON' do
    user1 = create(:user, email:'test1@email.com', username:'simon sauder')
    user2 = create(:user, email:'test2@email.com', username:'jimmy mac')
    get '/users', {}

    response_body = JSON.parse(response.body)
    expect(response.status).to eq 200
    expect(response_body[0]["id"]).to eq user1.id
    expect(response_body[0]["email"]).to eq user1.email
    expect(response_body[0]["username"]).to eq user1.username
    expect(response_body[1]["id"]).to eq user2.id
    expect(response_body[1]["email"]).to eq user2.email
    expect(response_body[1]["username"]).to eq user2.username
  end
end
