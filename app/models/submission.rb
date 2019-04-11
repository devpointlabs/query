class Submission < ApplicationRecord
  belongs_to :user, optional: :true
  belongs_to :quiz
  has_many :submission_choices
end
