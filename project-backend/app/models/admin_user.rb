class AdminUser < ApplicationRecord
  include UserAuthenticator
  attr_accessor :password

  belongs_to :company

  enum status: { deactivate: 0, activate: 1 }

  validates_presence_of :code, :first_name, :last_name, :password_hash, :password_salt, :email, :status

  def self.search(admin_users, params)
    admin_users = admin_users.where("code LIKE ?", "%#{params[:code]}%") if params[:code].present?
    admin_users = admin_users.where("first_name LIKE ?", "%#{params[:first_name]}%") if params[:first_name].present?
    admin_users = admin_users.where("last_name LIKE ?", "%#{params[:last_name]}%") if params[:last_name].present?
    admin_users = admin_users.where(status: params[:status]) if params[:status].present?
    return admin_users.order(created_at: "desc")
  end
end
