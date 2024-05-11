FactoryBot.define do
  factory :company do
    code { Faker::Alphanumeric.alpha(number: 10) }
    name { Faker::Company.name }
    status { :activate }
  end
end