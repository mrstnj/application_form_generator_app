module UserAuthenticator
  extend ActiveSupport::Concern
  included do
    before_save :encrypt_password
    attr_accessor :password
  end

  module ClassMethods
    def authenticate(email, password)
      user = self.approved.readonly(false).find_by_email(email)
      if user.present? && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
        return user
      else
        return nil
      end
    end
  end

  private
  
  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(self.password, self.password_salt)
    end
  end
end
  