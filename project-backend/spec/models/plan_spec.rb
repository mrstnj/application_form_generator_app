require 'rails_helper'

RSpec.describe Plan, type: :model do
  subject {FactoryBot.build(:plan)}
  context '正常な値が入力された場合' do
    it '登録できること' do
      expect(subject.save).to be_truthy
    end
    context 'すでに登録されている場合' do
      subject {FactoryBot.create(:plan)}
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
      subject {Plan.new}
      it 'エラーになること' do
        expect(subject).not_to be_valid
      end
    end

    context 'サービス' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.service = nil
          expect(subject).not_to be_valid
        end
      end
    end

    context 'プラン名' do
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
    context 'create_plan' do 
      context '引数が正常の場合' do 
        it 'planが返ること' do
          params = {
            service: FactoryBot.create(:service),
            name: 'sample plan',
            content: 'test',
            status: 1
          }
          expect(Plan.create_plan(params).present?).to be_truthy
        end
      end
    end

    context 'update_plan' do 
      subject {FactoryBot.create(:plan)}
      context '引数が正常の場合' do 
        it 'planが返ること' do
          params = {}
          params[:status] = 0
          expect(Plan.update_plan(params, subject).present?).to be_truthy
        end
      end
    end

    context 'search' do 
      subject {FactoryBot.create(:plan)}
      it 'service' do
        params = {}
        params[:service] = subject.service.name
        expect(Plan.search(Plan, params).present?).to be_truthy
      end
      it 'name' do
        params = {}
        params[:name] = subject.name
        expect(Plan.search(Plan, params).present?).to be_truthy
      end
      it 'status' do
        params = {}
        params[:status] = subject.status
        expect(Plan.search(Plan, params).present?).to be_truthy
      end
    end
  end
end
