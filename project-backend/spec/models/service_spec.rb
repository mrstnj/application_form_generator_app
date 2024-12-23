require 'rails_helper'

RSpec.describe Service, type: :model do
  subject {FactoryBot.build(:service)}
  context '正常な値が入力された場合' do
    it '登録できること' do
      expect(subject.save).to be_truthy
    end
    context 'すでに登録されている場合' do
      subject {FactoryBot.create(:service)}
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
      subject {Service.new}
      it 'エラーになること' do
        expect(subject).not_to be_valid
      end
    end

    context 'サービスコード' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.code = nil
          expect(subject).not_to be_valid
        end
      end
      context 'コードが重複している場合' do
        it 'エラーになること' do
          FactoryBot.create(:service, code: subject.code, company: subject.company)
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

    context 'サービス名' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.name = nil
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
    context 'create_service' do 
      subject {FactoryBot.create(:company)}
      context '引数が正常の場合' do 
        it 'serviceが返ること' do
          params = {
            code: 'sample_service',
            name: 'sample service',
            content: 'test',
            img: "",
            status: 1
          }
          expect(Service.create_service(params, subject).present?).to be_truthy
        end
      end
    end

    context 'update_service' do 
      subject {FactoryBot.create(:service)}
      context '引数が正常の場合' do 
        it 'serviceが返ること' do
          params = {}
          params[:status] = 0
          expect(Service.update_service(params, subject).present?).to be_truthy
        end
      end
    end

    context 'search' do 
      subject {FactoryBot.create(:service)}
      it 'company' do
        params = {}
        params[:company_name] = subject.company.name
        expect(Service.search(Service, params).present?).to be_truthy
      end
      it 'name' do
        params = {}
        params[:name] = subject.name
        expect(Service.search(Service, params).present?).to be_truthy
      end
      it 'status' do
        params = {}
        params[:status] = subject.status
        expect(Service.search(Service, params).present?).to be_truthy
      end
    end
  end
end
