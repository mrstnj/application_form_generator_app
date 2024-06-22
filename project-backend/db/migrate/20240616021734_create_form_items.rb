class CreateFormItems < ActiveRecord::Migration[7.1]
  def change
    create_table :form_items do |t|
      t.references :form, null: false, foreign_key: true
      t.string :name, null: false
      t.boolean :is_required, default: false
      t.integer :form_type, null: false
      t.integer :position, null: false

      t.timestamps
    end
  end
end
