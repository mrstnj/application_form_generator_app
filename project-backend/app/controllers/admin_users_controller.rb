class AdminUsersController < ApplicationController
  before_action :set_admin_user, only: %i[ show update destroy ]

  # GET /admin_users
  def index
    @admin_users = AdminUser.all
    @admin_users = @admin_users.search(@admin_users, params)
    render json: @admin_users
  end

  # GET /admin_users/1
  def show
    render json: @admin_user
  end

  # POST /admin_users
  def create
    begin
      # TODO ログイン機能が実装後ログイン中の管理者の企業を登録
      company = Company.find_by(id: 1)
      @admin_user = AdminUser.new(admin_user_params)
      @admin_user.company = company
      @admin_user.save!
      render json: @admin_user, status: :created, location: @admin_user
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /admin_users/1
  def update
    begin
      @admin_user.update!(admin_user_params)
      render json: @admin_user
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # DELETE /admin_users/1
  def destroy
    @admin_user.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_user
      @admin_user = AdminUser.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def admin_user_params
      params.require(:admin_user).permit(:code, :first_name, :last_name, :password, :email, :status)
    end
end
