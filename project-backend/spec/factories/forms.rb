FactoryBot.define do
  factory :form do
    company { FactoryBot.create(:company) }
    name { "sample form" }
  end
end
