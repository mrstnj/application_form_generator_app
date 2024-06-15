class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :status
  has_one :service
  has_one :form_item
end
