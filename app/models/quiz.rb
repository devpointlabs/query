class Quiz < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :submissions, dependent: :destroy
  has_many :users, through: :submissions, dependent: :destroy
end
