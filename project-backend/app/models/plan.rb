class Plan < ApplicationRecord
  belongs_to :service
  belongs_to :form_item, optional: true

  enum status: { deactivate: 0, activate: 1 }

  def self.create_plan(params, company)
    plan = nil
    ActiveRecord::Base::transaction do
      plan = self.new(params)
      plan.save!
    end
    return plan
  end

  def self.update_plan(params, plan)
    ActiveRecord::Base::transaction do
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
