require 'rails_helper'

RSpec.describe UserPlan, type: :model do
  subject {FactoryBot.build(:user_plan)}
  context '正常な値が入力された場合' do
    it '登録できること' do
      expect(subject.save).to be_truthy
    end
    context 'すでに登録されている場合' do
      subject {FactoryBot.create(:user)}
      it '削除できること' do
        expect(subject.destroy).to be_truthy
      end
    end
  end

  describe 'バリデーションテスト' do
    context '全項目入力しない場合' do
      subject {UserPlan.new}
      it 'エラーになること' do
        expect(subject).not_to be_valid
      end
    end

    context '会員' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.user = nil
          expect(subject).not_to be_valid
        end
      end
    end

    context 'プラン' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.plan = nil
          expect(subject).not_to be_valid
        end
      end
    end
  end
end
