class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :name
      t.belongs_to :quiz, foreign_key: true

      t.timestamps
    end
  end
end
