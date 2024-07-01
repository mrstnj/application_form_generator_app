class UserPlan < ApplicationRecord
  belongs_to :user
  belongs_to :plan
  has_many :form_item_answers

  validates_presence_of :user_id, :plan_id
end
