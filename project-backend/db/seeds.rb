# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
sample_company = FactoryBot.create(:company, code: "sample", name: "sample", status: 1)
FactoryBot.create(:admin_user, company: sample_company, code: "super_admin", last_name: "山田", first_name: "太郎", password: "password123", email: "test@test.com", status: 1)
FactoryBot.create(:service, company: sample_company, name: "サンプルサービス", content:nil, img:nil, status: 1)
