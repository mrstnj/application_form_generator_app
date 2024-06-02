module Token
  extend ActiveSupport::Concern

  def issue_access_token(expire_date = 30.minutes.since)
    issue_token("access_token", SecureRandom.hex(32), expire_date)
  end

  private
  def issue_token(param_name, value, expire_date)
    self[param_name.to_sym] = value
    self["#{param_name}_expire_date".to_sym] = expire_date
    self.save(validate: false)
  end
end