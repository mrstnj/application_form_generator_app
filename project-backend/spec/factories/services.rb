FactoryBot.define do
  factory :service do
    company { FactoryBot.create(:company) }
    name { "sample service" }
    content { "test" }
    status { 1 }
  end
end
