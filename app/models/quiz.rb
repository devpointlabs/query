class Quiz < ApplicationRecord
  has_many :questions, dependent: :destroy
end
