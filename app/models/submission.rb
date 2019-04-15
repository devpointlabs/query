class Submission < ApplicationRecord
  belongs_to :user, optional: :true
  belongs_to :quiz
  has_many :submission_choices

  def grade
    correct_answers = []
    self.submission_choices.each do |s|
      if s.choice.correct_answer
        correct_answers << s
      end
    end
    return grade = correct_answers.count.to_f / self.submission_choices.count.to_f
  end
end
