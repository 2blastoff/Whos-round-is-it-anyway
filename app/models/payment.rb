class Payment < ActiveRecord::Base

  belongs_to :user
  belongs_to :group

  validates_presence_of :amount
  validates_presence_of :user

end
