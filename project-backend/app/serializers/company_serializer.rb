class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name
  attribute :code, if: :is_show?
  attribute :status, if: :is_show?
  has_many :services, key: :services_attributes, serializer: ServiceSerializer

  def is_show?
    instance_options[:is_show].present?
  end
end
