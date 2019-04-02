class CreateChoices < ActiveRecord::Migration[5.2]
  def change
    create_table :choices do |t|
      t.string :answer
      t.boolean :correct_answer
      t.belongs_to :question, foreign_key: true

      t.timestamps
    end
  end
end
