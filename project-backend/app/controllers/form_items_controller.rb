class FormItemsController < ApplicationController
  before_action :set_form_item, only: %i[ show update destroy ]

  # GET /form_items
  def index
    @form_items = FormItem.all

    render json: @form_items
  end

  # GET /form_items/1
  def show
    render json: @form_item
  end

  # POST /form_items
  def create
    @form_item = FormItem.new(form_item_params)

    if @form_item.save
      render json: @form_item, status: :created, location: @form_item
    else
      render json: @form_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /form_items/1
  def update
    if @form_item.update(form_item_params)
      render json: @form_item
    else
      render json: @form_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /form_items/1
  def destroy
    @form_item.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_form_item
      @form_item = FormItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def form_item_params
      params.require(:form_item).permit(:company_id, :name, :is_required, :type, :position)
    end
end
