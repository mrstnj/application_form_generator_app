class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :code, :name, :content, :img, :status

  def img
    object.img.url if object.img.present?
  end
end
