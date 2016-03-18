require 'rails_helper'

feature 'groups', type: :request do

  scenario 'group creation' do
    expect{ add_group }.to change{ Group.count }.by 1
    expect(response.status).to eq 201

    response_body = JSON.parse(response.body)
    expect(response_body["name"]).to eq 'groupname'
  end

  let(:user1) { create(:user, email:'test1@email.com', username:'simon sauder') }
  let(:user2) { create(:user, email:'test2@email.com', username:'jimmy mac') }
  let(:group) { create(:group, user_ids: [user1.id, user2.id]) }

  scenario 'group retrieve information' do
    get "/groups/#{group.id}"
    response_body = JSON.parse(response.body)
    expect(response_body["id"]).to eq group.id
    expect(response_body["name"]).to eq group.name
    expect(response_body["users"].first["id"]).to eq user1.id
    expect(response_body["users"].last["id"]).to eq user2.id
  end

  scenario 'group retrieve current payer' do
    user2.payments.create(amount: 5, group: group)
    get "/groups/#{group.id}/payer"
    expect(JSON.parse(response.body)["id"]).to eq user1.id

    user1.payments.create(amount: 10, group: group)
    get "/groups/#{group.id}/payer"
    expect(JSON.parse(response.body)["id"]).to eq user2.id
  end
end
