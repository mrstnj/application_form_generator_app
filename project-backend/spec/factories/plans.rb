FactoryBot.define do
  factory :plan do
    service { nil }
    form_item { nil }
    name { "MyString" }
    content { "MyText" }
    status { 1 }
  end
end
