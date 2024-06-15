class CompaniesController < AdminController
  before_action :set_company, only: %i[ show update destroy ]
  skip_before_action :authenticate_token, only: %i[ show_by_code ]

  # GET /companies
  def index
    @companies = Company.all
    @companies = @companies.search(@companies, params)
    render json: @companies, each_serializer: CompanySerializer, root: nil, is_show: true
  end

  # GET /companies/1
  def show
    render json: @company, serializer: CompanySerializer, root: nil, is_show: true
  end

  def show_by_code
    @company = Company.find_by(code: params[:code])
    render json: @company, serializer: CompanySerializer, root: nil
  end

  # POST /companies
  def create
    begin
      @company = Company.create_company(company_params)
      render json: @company, status: :created, location: @company, serializer: CompanySerializer, root: nil
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /companies/1
  def update
    begin
      @company = Company.update_company(company_params, @company)
      render json: @company, serializer: CompanySerializer, root: nil
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # DELETE /companies/1
  def destroy
    @company.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_company
      @company = Company.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def company_params
      params.require(:company).permit(:code, :name, :status)
    end
end
