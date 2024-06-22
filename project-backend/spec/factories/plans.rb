FactoryBot.define do
  factory :plan do
    service { FactoryBot.create(:service) }
    name { "sample plan" }
    content { "test" }
    status { 1 }
  end
end
