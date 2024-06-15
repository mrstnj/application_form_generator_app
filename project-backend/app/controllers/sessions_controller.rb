class SessionsController < AdminController
  before_action :set_session, only: %i[ destroy ]
  before_action :authenticate_token, only: %i[ destroy ]

  # POST /sessions
  def create
    begin
      admin_user = AdminUser.authenticate_with_lock(session_params[:code], session_params[:password])
      return render_error('Invalid code or password', 400) unless admin_user.present?
      admin_user.issue_access_token
      render json: admin_user, serializer: AdminUserSerializer, root: nil, is_session: true
    rescue ActiveRecord::MyException => e
      return render_error("#{e.message}", :unprocessable_entity)
    rescue => e
      return render_error('エラーが発生しました', :internal_server_error)
    end
  end

  # DELETE /sessions/1
  def destroy
    @session.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session
      @session = Session.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def session_params
      params.require(:session).permit(:code, :password)
    end
end
