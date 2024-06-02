require 'rails_helper'

RSpec.describe AdminUser, type: :model do
  subject {FactoryBot.build(:admin_user)}
  context '正常な値が入力された場合' do
    it '登録できること' do
      expect(subject.save).to be_truthy
    end
    context 'すでに登録されている場合' do
      subject {FactoryBot.create(:admin_user)}
      it '編集できること' do
        subject.status = 'deactivate'
        expect(subject.save).to be_truthy
      end
      it '削除できること' do
        expect(subject.destroy).to be_truthy
      end
    end
  end

  describe 'バリデーションテスト' do
    context '全項目入力しない場合' do
      subject {AdminUser.new}
      it 'エラーになること' do
        expect(subject).not_to be_valid
      end
    end

    context 'ログインID' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.code = nil
          expect(subject).not_to be_valid
        end
      end
      context 'コードが重複している場合' do
        it 'エラーになること' do
          FactoryBot.create(:admin_user, code: subject.code)
          expect(subject).not_to be_valid
        end
      end
      context '21文字以上が入力された場合' do
        it 'エラーになること' do
          subject.code = "a" * 21
          expect(subject).not_to be_valid
        end
      end
      context '異常なフォーマットで入力された場合' do
        it 'エラーになること' do
          subject.code = "あああ"
          expect(subject).not_to be_valid
        end
      end
    end

    context '姓' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.last_name = nil
          expect(subject).not_to be_valid
        end
      end
    end

    context '名' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.first_name = nil
          expect(subject).not_to be_valid
        end
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

    context 'パスワード' do
      context '入力しない場合(create)' do
        it 'エラーになること' do
          subject.password = nil
          expect(subject).not_to be_valid(:create)
        end
      end
      context '入力しない場合(update)' do
        it 'エラーにならないこと' do
          subject.password = nil
          expect(subject).to be_valid(:update)
        end
      end
      context '7文字以下が入力された場合' do
        it 'エラーになること' do
          subject.password = "a" * 6 + '1'
          expect(subject).not_to be_valid
        end
      end
      context '51文字以上が入力された場合' do
        it 'エラーになること' do
          subject.password = "a" * 50 + '1'
          expect(subject).not_to be_valid
        end
      end
      context '数字のみで入力された場合' do
        it 'エラーになること' do
          subject.password = "1234567890"
          expect(subject).not_to be_valid
        end
      end
      context '英字のみで入力された場合' do
        it 'エラーになること' do
          subject.password = "abcdefghij"
          expect(subject).not_to be_valid
        end
      end
    end

    context 'ステータス' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.status = nil
          expect(subject).not_to be_valid
        end
      end
    end
  end

  describe 'メソッド動作テスト' do
    context 'search' do 
      subject {FactoryBot.create(:admin_user)}
      it 'code' do
        params = {}
        params[:code] = subject.code
        expect(AdminUser.search(AdminUser, params).present?).to be_truthy
      end
      it 'last_name' do
        params = {}
        params[:name] = subject.last_name
        expect(AdminUser.search(AdminUser, params).present?).to be_truthy
      end
      it 'first_name' do
        params = {}
        params[:name] = subject.first_name
        expect(AdminUser.search(AdminUser, params).present?).to be_truthy
      end
      it 'status' do
        params = {}
        params[:status] = subject.status
        expect(AdminUser.search(AdminUser, params).present?).to be_truthy
      end
    end
  end
end
