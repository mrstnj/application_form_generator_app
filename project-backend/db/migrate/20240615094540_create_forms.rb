class CreateForms < ActiveRecord::Migration[7.1]
  def change
    create_table :forms do |t|
      t.references :company, null: false, foreign_key: true
      t.string :name, null: false

      t.timestamps
    end
  end
end
