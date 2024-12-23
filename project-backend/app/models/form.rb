class Form < ApplicationRecord
  belongs_to :company
  has_many :form_items, ->{order('form_items.position')}, dependent: :destroy

  scope :scope_company, lambda{|company_id| where(company_id: company_id)}

  accepts_nested_attributes_for :form_items, allow_destroy: true

  validates_presence_of :name

  def self.create_form(params, company)
    form = nil
    ActiveRecord::Base::transaction do
      form = self.new(params)
      form.company = company unless form.company.present?
      form.save!      
    end
    return form
  end

  def self.update_form(params, form)
    ActiveRecord::Base::transaction do
      form.update!(params)
    end
    return form
  end

  def self.search(forms, params)
    forms = forms.joins(:company).where(company: { name: params[:company_name] }) if params[:company_name].present?
    forms = forms.where("name LIKE ?", "%#{params[:name]}%") if params[:name].present?
    return forms.order(created_at: "desc")
  end
end
