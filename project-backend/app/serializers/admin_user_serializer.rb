class AdminUserSerializer < ActiveModel::Serializer
  attributes :id, :code, :last_name, :first_name, :email, :status
  attribute :access_token, if: :is_session?

  def is_session?
    instance_options[:is_session].present?
  end
end