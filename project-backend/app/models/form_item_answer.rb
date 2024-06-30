class FormItemAnswer < ApplicationRecord
  belongs_to :user_plan

  validates_presence_of :user_plan_id, :name
end
