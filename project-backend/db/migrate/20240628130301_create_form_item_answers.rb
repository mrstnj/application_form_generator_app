class CreateFormItemAnswers < ActiveRecord::Migration[7.1]
  def change
    create_table :form_item_answers do |t|
      t.references :user_plan, null: false, foreign_key: true
      t.string :name, null: false
      t.string :value

      t.timestamps
    end
  end
end
