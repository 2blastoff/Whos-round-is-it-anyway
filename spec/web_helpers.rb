def register_user(email="test@test.com", username="john jones")
  headers = {'CONTENT TYPE' => 'application/json'}
  user = {user: {
            email:  email,
            password: "12345678",
            password_confirmation: "12345678",
            username: username
          }}
  post '/users', user, headers
end

def add_group
  user1 = create(:user, email:'test1@email.com', username:'simon sauder')
  user2 = create(:user, email:'test2@email.com', username:'jimmy mac')
  headers = {'CONTENT TYPE' => 'application/json'}
  group = {group: {
            name: 'groupname',
            user_ids: [user1.id, user2.id]
          }}
  post '/groups', group, headers
end

def submit_payment(group, user1)
  headers = {'CONTENT TYPE' => 'application/json'}
  payment = {payment: {
            amount: 100.23,
            user_id: user1.id
          }}
  post "/groups/#{group.id}/payments", payment, headers
end

def sign_in(email="test@test.com", password="12345678")
  headers = {'CONTENT TYPE' => 'application/json'}
  user = {user: {
            email:  email,
            password: password,
          }}
  post '/users/sign_in', user, headers
end
