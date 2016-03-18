require 'rails_helper'
include Capybara::Angular::DSL

feature 'user flow test', js:true do
  scenario 'user flow test' do
    user1 = create(:user, email:'test1@email.com', username:'simon sauder')
    user2 = create(:user, email:'test2@email.com', username:'jimmy mac')
    create(:payment, user: user1, amount: 10)
    create(:payment, user: user2, amount: 13)

    visit '/'
    expect(page).not_to have_content('username')
    click_button('choose-signup')
    fill_in('username', with: 'User1')
    fill_in('email', with: 'user1@email.com')
    fill_in('password', with: '12345678')
    fill_in('password_confirmation', with: '12345678')
    click_button('signUp')

    expect(page).to have_button('add-group')
    expect(User.count).to eq 3

    click_button('add-group')
    fill_in('add-group-name', with: 'group1')

    expect(page).to have_content('simon sauder')
    expect(page).to have_content('jimmy mac')

    page.all('.users').each(&:click)

    click_button('create-group')
    expect(page).to have_content('group1')
    expect(Group.count).to eq 1
    find('#update-payer').click
    expect(page).to have_content 'User1'

  end
end
