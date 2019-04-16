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

  def self.submissions_by_quiz(quiz_id)
    find_by_sql(["
    SELECT quizzes.name, users.email
    FROM submissions
    INNER JOIN quizzes ON submissions.quiz_id = quizzes.id
    INNER JOIN users ON submissions.user_id = users.id
    WHERE users.teacher = false
    AND quizzes.id = ?
    ", quiz_id])
  end
end
