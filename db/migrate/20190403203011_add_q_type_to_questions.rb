class AddQTypeToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :qType, :string
  end
end
