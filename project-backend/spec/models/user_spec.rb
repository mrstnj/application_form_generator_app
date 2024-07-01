require 'rails_helper'

RSpec.describe User, type: :model do
  subject {FactoryBot.build(:user)}
  context '正常な値が入力された場合' do
    it '登録できること' do
      expect(subject.save).to be_truthy
    end
    context 'すでに登録されている場合' do
      subject {FactoryBot.create(:user)}
      it '編集できること' do
        subject.email = 'test@test.com'
        expect(subject.save).to be_truthy
      end
      it '削除できること' do
        expect(subject.destroy).to be_truthy
      end
    end
  end

  describe 'バリデーションテスト' do
    context '全項目入力しない場合' do
      subject {User.new}
      it 'エラーになること' do
        expect(subject).not_to be_valid
      end
    end

    context 'メールアドレス' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.email = nil
          expect(subject).not_to be_valid
        end
      end
      context '異常なフォーマットで入力された場合' do
        it 'エラーになること' do
          subject.email = "test"
          expect(subject).not_to be_valid
        end
      end
    end
  end

  describe 'メソッド動作テスト' do
    context 'update_user' do 
      subject {FactoryBot.create(:user)}
      context '引数が正常の場合' do 
        it 'userが返ること' do
          params = {}
          params[:email] = 'update_test@test.com'
          expect(User.update_user(params, subject).present?).to be_truthy
        end
      end
    end

    context 'search' do 
      subject {FactoryBot.create(:user_plan)}
      it 'plan' do
        params = {}
        params[:plan] = subject.plan.name
        expect(User.search(User, params).present?).to be_truthy
      end
    end
  end
end
