class Service < ApplicationRecord
  belongs_to :company

  enum status: { deactivate: 0, activate: 1 }

  def self.search(services, params)
    services = services.where("name LIKE ?", "%#{params[:name]}%") if params[:name].present?
    services = services.where(status: params[:status]) if params[:status].present?
    return services.order(created_at: "desc")
  end
end
