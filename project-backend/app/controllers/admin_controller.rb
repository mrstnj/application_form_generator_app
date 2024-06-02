class AdminController < ApplicationController

  def render_error(msg = 'Access Denied. Please set token', status = 401)
    render json: { err: msg }, status: status
  end
end
