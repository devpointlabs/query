class CreateSubmissionChoices < ActiveRecord::Migration[5.2]
  def change
    create_table :submission_choices do |t|
      t.belongs_to :submission, foreign_key: true
      t.belongs_to :choice, foreign_key: true

      t.timestamps
    end
  end
end
