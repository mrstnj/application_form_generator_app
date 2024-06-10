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
