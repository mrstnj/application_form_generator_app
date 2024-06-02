class AddLoginColumnsToAdminUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :admin_users, :access_token, :string
    add_column :admin_users, :access_token_expire_date, :datetime
    add_column :admin_users, :lock_count, :integer, default: 0
    add_column :admin_users, :unlock_time, :datetime
  end
end
