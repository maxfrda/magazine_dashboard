class Magazine < ApplicationRecord
  has_many :issues, dependent: :destroy
  
end
