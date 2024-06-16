FactoryBot.define do
  factory :plan do
    service { FactoryBot.create(:service) }
    form_item { nil }
    name { "sample plan" }
    content { "test" }
    status { 1 }
  end
end
