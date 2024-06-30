class UserMailer < ApplicationMailer
  
  def complete_order(user_plan)
    @plan = user_plan.plan
    @user = user_plan.user
    @form_item_answers = FormItemAnswer.where(user_plan: user_plan)
    mail(
      subject: "申込完了のお知らせ",
      to: @user.email 
    )
  end
end
