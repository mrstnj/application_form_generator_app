class ServicesController < AdminController
  before_action :set_service, only: %i[ show update destroy ]

  # GET /services
  def index
    @services = Service.all
    @services = @services.search(@services, params)
    render json: @services
  end

  # GET /services/1
  def show
    render json: @service
  end

  # POST /services
  def create
    begin
      @service = Service.create_service(service_params, current_company)
      render json: @service, status: :created, location: @service
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /services/1
  def update
    begin
      @service = Service.update_service(service_params, @service)
      render json: @service
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # DELETE /services/1
  def destroy
    @service.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_service
      @service = Service.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def service_params
      params.require(:service).permit(:company_id, :name, :content, :img, :status)
    end
end
