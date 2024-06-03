class AdminUser < ApplicationRecord
  include UserAuthenticator
  include Token
  attr_accessor :password

  belongs_to :company

  enum status: { deactivate: 0, activate: 1 }

  validates :code, uniqueness: true, length: { in: 1..20 }, :format => { :with => /\A[0-9a-zA-Z_]{1,20}\z/ }
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

  def self.authenticate_with_lock(code, password)
    user = base_auth("code", code, password) do |user|
      user.lock_check
      user.update_columns(lock_count: user.lock_count += 1, unlock_time: 30.minutes.since)
    end
    if user.present?
      user.lock_check
      user.update_columns(:lock_count, 0) unless user.lock_count == 0
    end
    return user
  end

  def lock_check
    self.update_column(:lock_count, 0) unless self.unlock_time.present? && self.unlock_time >= Time.now
    raise ActiveRecord::MyException.new('User is locked') if self.lock_count >= 6
  end

end
