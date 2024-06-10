class AdminController < ApplicationController

  before_action :authenticate_token

  def render_error(msg = 'Access Denied. Please set token', status = 401)
    render json: { err: msg }, status: status
  end

  protected
  def authenticate_token
    access_token = request.headers['AccessToken']
    if access_token.present?
      admin_user = AdminUser.authenticate_access_token(access_token)
      if admin_user.present?
        admin_user.access_token_expire_date = 30.minutes.since
        admin_user.save(validate: false)
        @current_admin = admin_user
      else
        render_error('Access Denied. token is expired')
      end
    else
      render_error
    end
  end

  def current_admin
    return @current_admin
  end

  def current_company
    return @current_admin.company
  end
end
