class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :code, :name, :content, :img, :status
  has_many :plans, key: :plans_attributes, serializer: PlanSerializer
  has_one :company

  def img
    object.img.url if object.img.present?
  end
end
