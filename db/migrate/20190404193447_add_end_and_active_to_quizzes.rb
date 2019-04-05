class AddEndAndActiveToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :active, :boolean
    add_column :quizzes, :end, :string
  end
end
