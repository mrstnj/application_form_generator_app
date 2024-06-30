class CreateUserPlans < ActiveRecord::Migration[7.1]
  def change
    create_table :user_plans do |t|
      t.references :user, null: false, foreign_key: true
      t.references :plan, null: false, foreign_key: true

      t.timestamps
    end
  end
end
