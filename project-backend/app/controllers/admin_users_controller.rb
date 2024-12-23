class AdminUsersController < AdminController
  before_action :set_admin_user, only: %i[ show update destroy ]

  # GET /admin_users
  def index
    @admin_users = AdminUser.all
    @admin_users = AdminUser.scope_company(current_company.id) unless @current_admin.is_super_admin
    @admin_users = @admin_users.search(@admin_users, params)
    render json: @admin_users, each_serializer: AdminUserSerializer, root: nil
  end

  # GET /admin_users/1
  def show
    render json: @admin_user, serializer: AdminUserSerializer, root: nil
  end

  def fetch_current_user
    render json: @current_admin, serializer: AdminUserSerializer, root: nil
  end

  # POST /admin_users
  def create
    begin
      @admin_user = AdminUser.create_admin_user(admin_user_params, current_company)
      render json: @admin_user, status: :created, location: @admin_user, serializer: AdminUserSerializer, root: nil
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /admin_users/1
  def update
    begin
      params = admin_user_params
      if params[:password].present?
        admin_user = AdminUser.authenticate(@admin_user.code, params[:current_password])
        return render_error("Invalid password", 403) unless admin_user.present?
      else
        params.delete(:password)
      end
      params.delete(:current_password)
      @admin_user = AdminUser.update_admin_user(params, @admin_user)
      render json: @admin_user, serializer: AdminUserSerializer, root: nil
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
      params.require(:admin_user).permit(:company_id, :company_name, :code, :first_name, :last_name, :current_password, :password, :email, :status, :is_super_admin)
    end
end
