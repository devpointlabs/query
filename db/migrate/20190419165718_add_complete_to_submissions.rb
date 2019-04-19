class AddCompleteToSubmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :submissions, :complete, :boolean, default: false
  end
end
