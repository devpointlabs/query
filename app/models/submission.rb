class Submission < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :submission_choices
end
