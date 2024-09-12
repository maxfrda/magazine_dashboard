class Issue < ApplicationRecord
  has_one_attached :cover_image
  belongs_to :magazine
end
