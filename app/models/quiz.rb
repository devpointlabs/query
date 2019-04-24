class Quiz < ApplicationRecord
  has_many :questions, dependent: :destroy
  has_many :submissions, dependent: :destroy
  has_many :users, through: :submissions, dependent: :destroy

  # def self.substuff
  #   find_by_sql(["
  #   SELECT q.* FROM quizzes AS q
  #  "])
  # end

  def self.substuff(id)
    select("quizzes.*, submissions.going")
    .joins("LEFT JOIN submissions ON submissions.quiz_id = quizzes.id")
    .where("user_id = #{id}")
  end
end