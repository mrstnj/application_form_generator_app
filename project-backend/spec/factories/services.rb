FactoryBot.define do
  factory :service do
    company { FactoryBot.create(:company) }
    name { "MyString" }
    content { "MyText" }
    img { "MyString" }
    status { 1 }
  end
end
