class Service < ApplicationRecord
  include UpdateImage
  belongs_to :company

  enum status: { deactivate: 0, activate: 1 }

  validates_presence_of :name, :status

  mount_uploader :img, ImageUploader

  def self.create_service(params)
    service = nil
    ActiveRecord::Base::transaction do
      params[:img] = base64_conversion(params[:img]) if params[:img].present?
      # TODO ログイン機能が実装後ログイン中の管理者の企業を登録
      company = Company.find_by(id: 1)
      service = self.new(params)
      service.company = company
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
