class Group < ActiveRecord::Base

  has_and_belongs_to_many :users
  has_many :payments

  validates_presence_of :name
  validates_presence_of :users

  def current_payer
    payer = users.sample
    users.each do |user|
      total = user.total_in_group(self)
      payer = user if total < payer.total_in_group(self)
    end
    payer
  end
end
