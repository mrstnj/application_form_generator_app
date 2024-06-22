class FormItem < ApplicationRecord
  belongs_to :form

  enum form_type: { text: 1, number: 2, date: 3, email: 4 }

  validates :name, uniqueness: {:scope => :form_id}
  validates_presence_of :name, :form_type, :position
end
