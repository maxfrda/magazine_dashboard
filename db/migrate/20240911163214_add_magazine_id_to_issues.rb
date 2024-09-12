class AddMagazineIdToIssues < ActiveRecord::Migration[6.1]
  def change
    add_reference :issues, :magazine, foreign_key: true
  end
end
