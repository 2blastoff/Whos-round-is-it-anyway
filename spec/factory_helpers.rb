FactoryGirl.define do
  factory :user do
    email 'user1@email.com'
    password '12345678'
    password_confirmation '12345678'
    username 'user1'
  end

  factory :group do
    name 'group1'
    user_ids [1, 2, 3]
  end

  factory :payment do
    user_id 1
    amount 40
  end
end
