FactoryBot.define do
  factory :form_item do
    form { nil }
    name { "MyString" }
    is_required { false }
    type { 1 }
    position { 1 }
  end
end
