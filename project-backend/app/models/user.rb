class User < ApplicationRecord
  has_many :user_plans
  has_many :plans, through: :user_plans

  validates :email, :format => { :with => /\A[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\z/ }
  validates_presence_of :email

  def self.search(users, params)
    users = users.joins(user_plans: :plan).where(plans: { name: params[:plan] }) if params[:plan].present?
    return users.order(created_at: "desc")
  end
end
