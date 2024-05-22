class CreateAdminUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :admin_users do |t|
      t.references :company, null: false
      t.string :code, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :password_hash, null: false
      t.string :password_salt, null: false
      t.string :email, null: false
      t.integer :status, null: false

      t.timestamps
    end
  end
end
