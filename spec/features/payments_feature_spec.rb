require 'rails_helper'

  feature 'payment', type: :request do
    scenario 'submitting a payment' do
      user1 = create(:user, email:'test1@email.com', username:'simon sauder')
      user2 = create(:user, email:'test2@email.com', username:'jimmy mac')
      group = create(:group, user_ids: [user1.id, user2.id])

      expect{ submit_payment(group, user1) }.to change{ Payment.count }.by 1
      response_body = JSON.parse(response.body)
      expect(response_body["id"]).to eq user2.id
    end
  end
