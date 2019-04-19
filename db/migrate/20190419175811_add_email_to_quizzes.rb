class AddEmailToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :email, :string
  end
end
