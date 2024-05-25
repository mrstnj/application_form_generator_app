FactoryBot.define do
  factory :admin_user do
    company { FactoryBot.create(:company) }
    code { Faker::Alphanumeric.alpha(number: 10) }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    password { "password123" }
    email { Faker::Internet.email }
    status { 1 }
  end
end
