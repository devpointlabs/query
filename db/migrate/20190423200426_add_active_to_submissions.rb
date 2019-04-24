class AddActiveToSubmissions < ActiveRecord::Migration[5.2]
  def change
    add_column :submissions, :going, :boolean, :default => true
  end
end
