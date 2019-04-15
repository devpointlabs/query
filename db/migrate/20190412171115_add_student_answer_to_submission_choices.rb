class AddStudentAnswerToSubmissionChoices < ActiveRecord::Migration[5.2]
  def change
    add_column :submission_choices, :student_answer, :string
  end
end
