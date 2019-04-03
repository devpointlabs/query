class AddExplanationToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :explanation, :text
  end
end
