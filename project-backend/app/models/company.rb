class Company < ApplicationRecord
  enum status: { deactivate: 0, activate: 1 }

  def self.search(companies, params)
    companies = companies.where("code LIKE ?", "%#{params[:code]}%") if params[:code].present?
    companies = companies.where("name LIKE ?", "%#{params[:name]}%") if params[:name].present?
    companies = companies.where(status: params[:status]) if params[:status].present?
    return companies.order(created_at: "desc")
  end
end
