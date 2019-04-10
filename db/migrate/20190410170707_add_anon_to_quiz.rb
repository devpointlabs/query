class AddAnonToQuiz < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :anon, :boolean
  end
end
