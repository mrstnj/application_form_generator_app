class FormsController < AdminController
  before_action :set_form, only: %i[ show update destroy ]

  # GET /forms
  def index
    @forms = Form.all

    render json: @forms
  end

  # GET /forms/1
  def show
    render json: @form
  end

  # POST /forms
  def create
    begin
      @form = Form.create_form(form_params, current_company)
      render json: @form, status: :created, location: @form, serializer: FormSerializer, root: nil
    rescue => e
      render json: { err: e.message }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /forms/1
  def update
    if @form.update(form_params)
      render json: @form
    else
      render json: @form.errors, status: :unprocessable_entity
    end
  end

  # DELETE /forms/1
  def destroy
    @form.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_form
      @form = Form.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def form_params
      params.require(:form).permit(:company_id, :name, form_items_attributes: [:name, :form_type, :is_required, :position])
    end
end
