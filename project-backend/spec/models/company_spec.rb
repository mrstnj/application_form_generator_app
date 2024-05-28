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

  describe 'バリデーションテスト' do
    context '全項目入力しない場合' do
      subject {Company.new}
      it 'エラーになること' do
        expect(subject).not_to be_valid
      end
    end

    context '企業コード' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.code = nil
          expect(subject).not_to be_valid
        end
      end
      context 'コードが重複している場合' do
        it 'エラーになること' do
          FactoryBot.create(:company, code: subject.code)
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

    context '企業名' do
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
end