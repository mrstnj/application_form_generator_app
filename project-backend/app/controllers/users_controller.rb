class UsersController < AdminController
  before_action :set_user, only: %i[ show update destroy ]
  skip_before_action :authenticate_token, only: %i[ create ]

  # GET /users
  def index
    @users = User.all
    @users = User.scope_company(current_company.id) unless @current_admin.is_super_admin
    @users = @users.search(@users, params)
    render json: @users, each_serializer: UserSerializer, root: nil
  end

  # GET /users/1
  def show
    render json: @user, serializer: UserSerializer, root: nil
  end

  def show_user_plan
    @user_plan = UserPlan.where(user_id: params[:id])
    render json: @user_plan, each_serializer: UserPlanSerializer, root: nil
  end

  # POST /users
  def create
    begin
      order_service = OrderService.new(user_params)
      @user = order_service.create_order
      render json: @user, status: :created, location: @user, serializer: UserSerializer, root: nil
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    begin
      @user = User.update_user(user_params, @user)
      render json: @user, serializer: UserSerializer, root: nil
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:email, :plan_id, form_item_answer: [:name, :value])
    end
end
