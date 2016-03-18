require 'rails_helper'

describe User, type: :model do
  it { is_expected.to have_and_belong_to_many(:groups) }
  it { is_expected.to have_many (:payments) }

end
