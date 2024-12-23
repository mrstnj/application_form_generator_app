class PlansController < AdminController
  before_action :set_plan, only: %i[ show update destroy ]
  skip_before_action :authenticate_token, only: %i[ show ]

  # GET /plans
  def index
    @plans = Plan.all
    @plans = Plan.scope_company(current_company.id) unless @current_admin.is_super_admin
    @plans = @plans.search(@plans, params)
    render json: @plans, each_serializer: PlanSerializer, root: nil
  end

  # GET /plans/1
  def show
    if @plan.present?
      render json: @plan, serializer: PlanSerializer, root: nil
    else
      render json: nil
    end
  end

  # POST /plans
  def create
    begin
      @plan = Plan.create_plan(plan_params)
      render json: @plan, status: :created, location: @plan, serializer: PlanSerializer, root: nil
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /plans/1
  def update
    begin
      @plan = Plan.update_plan(plan_params, @plan)
      render json: @plan, serializer: PlanSerializer, root: nil
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # DELETE /plans/1
  def destroy
    @plan.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_plan
      @plan = Plan.find_by(id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def plan_params
      params.require(:plan).permit(:service_id, :form_id, :name, :content, :status)
    end
end
