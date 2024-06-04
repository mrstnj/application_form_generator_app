class CreateServices < ActiveRecord::Migration[7.1]
  def change
    create_table :services do |t|
      t.references :company, null: false, foreign_key: true
      t.string :name, null: false
      t.text :content
      t.string :img
      t.integer :status, null: false

      t.timestamps
    end
  end
end
