FactoryBot.define do
  factory :form_item do
    form { FactoryBot.create(:form) }
    name { "sample form item" }
    is_required { false }
    form_type { 1 }
    position { 1 }
  end
end
