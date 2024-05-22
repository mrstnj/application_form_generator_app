FactoryBot.define do
  factory :admin_user do
    first_name { "MyString" }
    last_name { "MyString" }
    password_hash { "MyString" }
    password_salt { "MyString" }
    email { "MyString" }
    status { 1 }
  end
end
