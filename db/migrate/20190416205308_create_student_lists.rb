class CreateStudentLists < ActiveRecord::Migration[5.2]
  def change
    create_table :student_lists do |t|
      t.string :email
      t.string :name
      t.string :info
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
