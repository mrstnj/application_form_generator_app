class PlansController < AdminController
  before_action :set_plan, only: %i[ show update destroy ]

  # GET /plans
  def index
    @plans = Plan.all
    @plans = @plans.search(@plans, params)
    render json: @plans, each_serializer: PlanSerializer, root: nil
  end

  # GET /plans/1
  def show
    render json: @plan, serializer: PlanSerializer, root: nil
  end

  # POST /plans
  def create
    begin
      @plan = Plan.create_plan(plan_params, current_company)
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
      @plan = Plan.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def plan_params
      params.require(:plan).permit(:service_id, :form_item_id, :name, :content, :status)
    end
end
