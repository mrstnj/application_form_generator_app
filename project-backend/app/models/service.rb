class Service < ApplicationRecord
  include UpdateImage
  belongs_to :company
  has_many :plans

  scope :scope_company, lambda{|company_id| where(company_id: company_id)}

  enum status: { deactivate: 0, activate: 1 }

  validates :code, uniqueness: { scope: :company_id }, length: { in: 1..20 }, :format => { :with => /\A[0-9a-zA-Z_]{1,20}\z/ }
  validates_presence_of :code, :name, :status

  mount_uploader :img, ImageUploader

  def self.create_service(params, company)
    service = nil
    ActiveRecord::Base::transaction do
      params[:img] = base64_conversion(params[:img]) if params[:img].present?
      service = self.new(params)
      service.company = company unless service.company.present?
      service.save!
    end
    return service
  end

  def self.update_service(params, service)
    ActiveRecord::Base::transaction do
      params[:img] = base64_conversion(params[:img]) if params[:img].present?
      service.update!(params)
    end
    return service
  end

  def self.search(services, params)
    services = services.where("name LIKE ?", "%#{params[:name]}%") if params[:name].present?
    services = services.where(status: params[:status]) if params[:status].present?
    return services.order(created_at: "desc")
  end
end
