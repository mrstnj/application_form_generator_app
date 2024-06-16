class FormItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :is_required, :type, :position
  has_one :company
end
