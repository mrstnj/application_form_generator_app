module Token
  extend ActiveSupport::Concern

  def issue_access_token(expire_date = Settings.admin_user.access_token_expire_date.minutes.since)
    issue_token("access_token", SecureRandom.hex(32), expire_date)
  end

  private
  def issue_token(param_name, value, expire_date)
    self[param_name.to_sym] = value
    self["#{param_name}_expire_date".to_sym] = expire_date
    self.save(validate: false)
  end

  module ClassMethods
    def authenticate_access_token(access_token)
      authenticate_token(access_token)
    end

    private
    def authenticate_token(access_token)
      admin_user = self.find_by(access_token: access_token)
      if admin_user.present? && Time.now <= admin_user.access_token_expire_date
        return admin_user
      else
        nil
      end
    end
  end
end