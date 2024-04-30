class CreateCompanies < ActiveRecord::Migration[7.1]
  def change
    create_table :companies do |t|
      t.string :code, null: false
      t.string :name, null: false
      t.integer :status, null: false

      t.timestamps
    end
  end
end
