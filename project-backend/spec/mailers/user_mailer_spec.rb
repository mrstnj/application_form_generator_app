require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe 'メソッド動作テスト' do
    context 'complete_order' do
      it 'メールが送信されること' do
        user_plan = FactoryBot.create(:user_plan)
        FactoryBot.create(:form_item_answer, user_plan: user_plan, name: "sample form item", value: "sample form value")
        UserMailer.complete_order(user_plan).deliver_now
        expect(ActionMailer::Base.deliveries.count).to eq(1)
      end
    end
  end
end
