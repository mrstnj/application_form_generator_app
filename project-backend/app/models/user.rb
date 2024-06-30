class User < ApplicationRecord
  validates :email, :format => { :with => /\A[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\z/ }
  validates_presence_of :email

end
