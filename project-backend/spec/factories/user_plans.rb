FactoryBot.define do
  factory :user_plan do
    user { FactoryBot.create(:user) }
    plan { FactoryBot.create(:plan) }
  end
end
