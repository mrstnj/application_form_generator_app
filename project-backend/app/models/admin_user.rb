class AdminUser < ApplicationRecord
  include UserAuthenticator
  attr_accessor :password

  belongs_to :company

  enum status: { deactivate: 0, activate: 1 }

  validates_presence_of :login, :first_name, :last_name, :password_hash, :password_salt, :email, :status

end
