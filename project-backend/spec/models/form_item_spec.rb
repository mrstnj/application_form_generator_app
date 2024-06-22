require 'rails_helper'

RSpec.describe FormItem, type: :model do
  subject {FactoryBot.build(:form_item)}
  context '正常な値が入力された場合' do
    it '登録できること' do
      expect(subject.save).to be_truthy
    end
    context 'すでに登録されている場合' do
      subject {FactoryBot.create(:form_item)}
      it '編集できること' do
        subject.name = 'update form item'
        expect(subject.save).to be_truthy
      end
      it '削除できること' do
        expect(subject.destroy).to be_truthy
      end
    end
  end

  describe 'バリデーションテスト' do
    context '全項目入力しない場合' do
      subject {FormItem.new}
      it 'エラーになること' do
        expect(subject).not_to be_valid
      end
    end

    context 'フォーム項目名' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.name = nil
          expect(subject).not_to be_valid
        end
      end
      context 'フォーム項目名が重複している場合' do
        it 'エラーになること' do
          FactoryBot.create(:form_item, form: subject.form, name: subject.name)
          expect(subject).not_to be_valid
        end
      end
    end
  
    context 'フォーム項目種別' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.form_type = nil
          expect(subject).not_to be_valid
        end
      end
    end

    context '表示順' do
      context 'nilの場合' do
        it 'エラーになること' do
          subject.position = nil
          expect(subject).not_to be_valid
        end
      end
    end
  end
end
