class AdminUser < ApplicationRecord
  include UserAuthenticator
  attr_accessor :password

  belongs_to :company

  enum status: { deactivate: 0, activate: 1 }

  validates :code, uniqueness: true, length: { in: 1..10 }, :format => { :with => /\A[0-9a-zA-Z_]{1,10}\z/ }
  validates :email, :format => { :with => /\A[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\z/ }
  validates :password, allow_blank: true, length: { in: 8..50 }, :format => { :with => /\A(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,50}\z/ }
  validates :password, presence: true, on: :create
  validates_presence_of :code, :first_name, :last_name, :email, :status

  def self.search(admin_users, params)
    admin_users = admin_users.where("code LIKE ?", "%#{params[:code]}%") if params[:code].present?
    admin_users = admin_users.where("first_name LIKE ?", "%#{params[:first_name]}%") if params[:first_name].present?
    admin_users = admin_users.where("last_name LIKE ?", "%#{params[:last_name]}%") if params[:last_name].present?
    admin_users = admin_users.where(status: params[:status]) if params[:status].present?
    return admin_users.order(created_at: "desc")
  end
end
