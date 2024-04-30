class Company < ApplicationRecord
  enum status: { '無効': 0, '有効': 1 }
end
