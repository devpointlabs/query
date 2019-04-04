class AddInfoToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :info, :string
  end
end
