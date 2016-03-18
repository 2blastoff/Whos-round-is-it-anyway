require 'rails_helper'

describe Payment, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:group) }
end
