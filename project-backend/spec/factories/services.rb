FactoryBot.define do
  factory :service do
    company { FactoryBot.create(:company) }
    code { Faker::Alphanumeric.alpha(number: 10) }
    name { "sample service" }
    content { "test" }
    status { 1 }
  end
end
