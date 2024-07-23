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
          FactoryBot.create(:admin_user, code: subject.code, company: subject.company)
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
    context 'create_admin_user' do 
      subject {FactoryBot.create(:company)}
      context '引数が正常の場合' do 
        it 'admin_userが返ること' do
          params = {
            company: FactoryBot.create(:company),
            code: Faker::Alphanumeric.alpha(number: 10),
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            password: "password123",
            email: Faker::Internet.email,
            status: 1
          }
          expect(AdminUser.create_admin_user(params, subject).present?).to be_truthy
        end
      end
    end

    context 'update_admin_user' do 
      subject {FactoryBot.create(:admin_user)}
      context '引数が正常の場合' do 
        it 'admin_userが返ること' do
          params = {}
          params[:status] = 0
          expect(AdminUser.update_admin_user(params, subject).present?).to be_truthy
        end
      end
    end

    context 'search' do 
      subject {FactoryBot.create(:admin_user)}
      it 'company' do
        params = {}
        params[:company_name] = subject.company.name
        expect(AdminUser.search(AdminUser, params).present?).to be_truthy
      end
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

    context 'authenticate_with_lock' do
      subject {FactoryBot.create(:admin_user)}
      context '存在する管理者の場合' do
        it '対象の管理者を返すこと' do
          expect(AdminUser.authenticate_with_lock(subject.code, subject.password)).to eq(subject)
        end
        it 'ログイン失敗回数が0回になること' do
          AdminUser.authenticate_with_lock(subject.code, subject.password)
          expect(subject.lock_count).to eq(0)
        end
      end
      context '存在しない管理者の場合' do
        it 'nilを返すこと' do
          expect(AdminUser.authenticate_with_lock(subject.code, nil)).to eq(nil)
        end
        it 'ログイン失敗回数が1増えること' do
          expect{
            AdminUser.authenticate_with_lock(subject.code, "test")
            subject.reload  
          }.to change {subject.lock_count}.by(1)
        end
      end
    end

    context 'lock_check' do
      subject {FactoryBot.create(:admin_user)}
      context 'unlock_timeがnilの場合' do
        it 'lock_countが0になること' do
          subject.unlock_time = nil
          subject.lock_count = 5
          subject.lock_check
          expect(subject.lock_count).to eq(0)
        end
        it 'エラーが発生しないこと' do
          subject.unlock_time = nil
          expect{subject.lock_check}.not_to raise_error
        end
      end
      context '現在時刻がunlock_timeを超過している場合' do
        it 'lock_countが0になること' do
          subject.unlock_time = Time.now.ago(10.minutes)
          subject.lock_count = 6
          subject.lock_check
          expect(subject.lock_count).to eq(0)
        end
        context 'ログイン失敗回数がunlock_countを超過している場合' do
          it 'エラーが発生しないこと' do
            subject.unlock_time = Time.now.ago(10.minutes)
            subject.lock_count = 6
            expect{subject.lock_check}.not_to raise_error
          end
        end
      end
      context '現在時刻がunlock_timeを超過していない場合' do
        it 'lock_countが変わらないこと' do
          subject.unlock_time = Time.now.since(10.minutes)
          subject.lock_count = 5
          subject.lock_check
          expect(subject.lock_count).to eq(5)
        end
        context 'ログイン失敗回数がunlock_countを超過している場合' do
          it 'エラーが発生すること' do
            subject.unlock_time = Time.now.since(10.minutes)
            subject.lock_count = 6
            expect{subject.lock_check}.to raise_error(ActiveRecord::MyException)
          end
        end
      end
    end
  end
end
