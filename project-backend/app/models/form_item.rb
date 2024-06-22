class FormItem < ApplicationRecord
  belongs_to :form

  enum form_type: { text: 1, number: 2, date: 3, email: 4 }
end
