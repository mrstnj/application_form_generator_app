class UserPlanSerializer < ActiveModel::Serializer
  has_many :form_item_answers
  has_one :plan
end
