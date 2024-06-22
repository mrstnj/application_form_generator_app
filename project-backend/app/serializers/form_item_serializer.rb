class FormItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :form_type, :is_required
end
  