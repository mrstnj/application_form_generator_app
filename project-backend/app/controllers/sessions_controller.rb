class SessionsController < AdminController
  before_action :set_session, only: %i[ show update destroy ]
  before_action :authenticate_token, only: %i[ destroy ]

  # GET /sessions
  def index
    @sessions = Session.all

    render json: @sessions
  end

  # GET /sessions/1
  def show
    render json: @session
  end

  # POST /sessions
  def create
    begin
      admin_user = AdminUser.authenticate_with_lock(session_params[:code], session_params[:password])
      return render_error('Invalid code or password', 400) unless admin_user.present?
      admin_user.issue_access_token
      render json: admin_user
    rescue ActiveRecord::MyException => e
      return render_error("#{e.message}", :unprocessable_entity)
    rescue => e
      return render_error('エラーが発生しました', :internal_server_error)
    end
  end

  # PATCH/PUT /sessions/1
  def update
    if @session.update(session_params)
      render json: @session
    else
      render json: @session.errors, status: :unprocessable_entity
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
