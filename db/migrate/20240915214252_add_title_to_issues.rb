class AddTitleToIssues < ActiveRecord::Migration[6.1]
  def change
    add_column :issues, :title, :string
  end
end
