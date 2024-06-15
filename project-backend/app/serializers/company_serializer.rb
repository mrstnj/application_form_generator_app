class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :services, key: :services_attributes, serializer: ServiceSerializer
end
