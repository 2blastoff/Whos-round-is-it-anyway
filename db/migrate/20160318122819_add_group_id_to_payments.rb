class AddGroupIdToPayments < ActiveRecord::Migration
  def change
    add_reference :payments, :group, index: true, foreign_key: true
  end
end
