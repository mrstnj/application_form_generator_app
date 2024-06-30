class UserPlan < ApplicationRecord
  belongs_to :user
  belongs_to :plan

  validates_presence_of :user_id, :plan_id
end
