class Company < ApplicationRecord
  enum status: { deactivate: 0, activate: 1 }

  validates :code, uniqueness: true, length: { in: 1..10 }, :format => { :with => /\A[0-9a-zA-Z_]{1,10}\z/ }
  validates_presence_of :code, :name, :status

  def self.search(companies, params)
    companies = companies.where("code LIKE ?", "%#{params[:code]}%") if params[:code].present?
    companies = companies.where("name LIKE ?", "%#{params[:name]}%") if params[:name].present?
    companies = companies.where(status: params[:status]) if params[:status].present?
    return companies.order(created_at: "desc")
  end
end
