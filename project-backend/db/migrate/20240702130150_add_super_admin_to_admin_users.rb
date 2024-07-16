class AddSuperAdminToAdminUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :admin_users, :is_super_admin, :boolean, default: false
  end
end
