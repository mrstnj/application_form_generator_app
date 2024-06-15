class CreatePlans < ActiveRecord::Migration[7.1]
  def change
    create_table :plans do |t|
      t.references :service, null: false, foreign_key: true
      t.references :form_item, null: true, foreign_key: true
      t.string :name, null: false
      t.text :content
      t.integer :status, null: false

      t.timestamps
    end
  end
end
