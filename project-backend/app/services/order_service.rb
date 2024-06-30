class OrderService

  def initialize(params)
    @plan = Plan.find(params[:plan_id])
    @email = params[:email]
    @form_item_answer_params = params[:form_item_answer]
  end

  def create_order
    user = nil;
    ActiveRecord::Base::transaction do
      user = User.create!(email: @email)
      user_plan = UserPlan.create!(user: user, plan: @plan)
      @form_item_answer_params.each do |form_item_answer_param|
        FormItemAnswer.create!(
          user_plan: user_plan,
          name: form_item_answer_param[:name],
          value: form_item_answer_param[:value]
        )
      end
      UserMailer.complete_order(user_plan).deliver_later
    end
    return user
  end

end