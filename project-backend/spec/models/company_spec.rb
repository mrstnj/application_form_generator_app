require 'rails_helper'

RSpec.describe Company, type: :model do
  subject {FactoryBot.build(:company)}
  context '正常な値が入力された場合' do
    it '登録できること' do
      expect(subject.save).to be_truthy
    end
    context 'すでに登録されている場合' do
      subject {FactoryBot.create(:company)}
      it '編集できること' do
        subject.status = 'deactivate'
        expect(subject.save).to be_truthy
      end
      it '削除できること' do
        expect(subject.destroy).to be_truthy
      end
    end
  end

  describe 'メソッド動作テスト' do
    context 'search' do 
      subject {FactoryBot.create(:company)}
      it 'code' do
        params = {}
        params[:code] = subject.code
        expect(Company.search(Company, params).present?).to be_truthy
      end
      it 'name' do
        params = {}
        params[:name] = subject.name
        expect(Company.search(Company, params).present?).to be_truthy
      end
      it 'status' do
        params = {}
        params[:status] = subject.status
        expect(Company.search(Company, params).present?).to be_truthy
      end
    end
  end

  
  # context '異常な値が入力された場合' do
  #   it "企業名がない場合、無効である"
  #   it "企業コードがない場合、無効である" 
  #   it "ステータスがない場合、無効である" 
  # end

end