class Plan < ApplicationRecord
  belongs_to :service
  belongs_to :form, optional: true
  has_many :user_plans
  has_many :users, through: :user_plans

  enum status: { deactivate: 0, activate: 1 }

  validates_presence_of :service_id, :name, :status

  def self.create_plan(params)
    plan = nil
    ActiveRecord::Base::transaction do
      params[:form_id] = nil if params[:form_id] == 0
      plan = self.new(params)
      plan.save!
    end
    return plan
  end

  def self.update_plan(params, plan)
    ActiveRecord::Base::transaction do
      params[:form_id] = nil if params[:form_id] == 0
      plan.update!(params)
    end
    return plan
  end

  def self.search(plans, params)
    plans = plans.joins(:service).where(service: { name: params[:service] }) if params[:service].present?
    plans = plans.where("name LIKE ?", "%#{params[:name]}%") if params[:name].present?
    plans = plans.where(status: params[:status]) if params[:status].present?
    return plans.order(created_at: "desc")
  end
end
