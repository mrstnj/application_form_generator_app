require 'rails_helper'

RSpec.describe Form, type: :model do
  subject {FactoryBot.build(:form)}
  context '正常な値が入力された場合' do
    it '登録できること' do
      expect(subject.save).to be_truthy
    end
    context 'すでに登録されている場合' do
      subject {FactoryBot.create(:form)}
      it '編集できること' do
        subject.name = 'update form'
        expect(subject.save).to be_truthy
      end
      it '削除できること' do
        expect(subject.destroy).to be_truthy
      end
    end
  end

  describe 'バリデーションテスト' do
    context '全項目入力しない場合' do
      subject {Form.new}
      it 'エラーになること' do
        expect(subject).not_to be_valid
      end
    end

    context 'フォーム名' do
      context '入力しない場合' do
        it 'エラーになること' do
          subject.name = nil
          expect(subject).not_to be_valid
        end
      end
    end
  end

  describe 'メソッド動作テスト' do
    context 'create_form' do 
      subject {FactoryBot.create(:company)}
      context '引数が正常の場合' do 
        it 'formが返ること' do
          params = {
            name: 'sample plan',
            form_items_attributes: {
              '0' => { 
                name: 'sample form item',
                is_required: false,
                form_type: 1,
                position: 1
              }
            }
          }
          expect(Form.create_form(params, subject).present?).to be_truthy
        end
      end
    end

    context 'update_form' do 
      subject {FactoryBot.create(:form)}
      context '引数が正常の場合' do 
        it 'planが返ること' do
          params = {}
          params[:name] = 'update form'
          expect(Plan.update_plan(params, subject).present?).to be_truthy
        end
      end
    end

    context 'search' do 
      subject {FactoryBot.create(:form)}
      it 'name' do
        params = {}
        params[:name] = subject.name
        expect(Form.search(Form, params).present?).to be_truthy
      end
    end
  end

end
