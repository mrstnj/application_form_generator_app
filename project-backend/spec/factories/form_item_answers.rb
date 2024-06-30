FactoryBot.define do
  factory :form_item_answer do
    user_plan { FactoryBot.create(:user_plan) }
    name { "sample form item" }
    value { "sample form value" }
  end
end
