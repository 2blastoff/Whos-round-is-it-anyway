require 'rails_helper'

describe Group, type: :model do
  it { is_expected.to have_and_belong_to_many(:users) }
  it { is_expected.to have_many(:payments) }


  describe '#current_payer' do
    it 'returns the current payer' do
      user1 = create(:user)
      user2 = create(:user, email:'user2@email.com', username:'user2')
      user3 = create(:user, email:'user3@email.com', username:'user3')
      group = create(:group, user_ids: [user1.id, user2.id, user3.id])

      group.payments.create(amount: 20, user: user1)
      group.payments.create(amount: 5, user: user2)

      expect(group.current_payer).to eq user3
      group.payments.create(amount: 200, user: user3)
      expect(group.current_payer).to eq user2

      dummy_group = create(:group, user_ids: [user2.id])
      dummy_group.payments.create(amount: 500, user: user2)
      expect(group.current_payer).to eq user2

    end
  end
end
