class AddCodeToServices < ActiveRecord::Migration[7.1]
  def change
    add_column :services, :code, :string, null: false
  end
end
