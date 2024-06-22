class FormSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :company
  has_many :form_items, key: :form_items_attributes, serializer: FormItemSerializer
end
