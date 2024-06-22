FactoryBot.define do
  factory :plan do
    service { FactoryBot.create(:service) }
    # form { nil }
    name { "sample plan" }
    content { "test" }
    status { 1 }
  end
end
