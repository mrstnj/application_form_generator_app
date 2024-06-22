class Form < ApplicationRecord
  belongs_to :company
  has_many :form_items

  accepts_nested_attributes_for :form_items, allow_destroy: true, reject_if: :all_blank

  def self.create_form(params, company)
    form = nil
    ActiveRecord::Base::transaction do
      form = self.new(params)
      form.company = company
      form.save!      
    end
    return form
  end
end
