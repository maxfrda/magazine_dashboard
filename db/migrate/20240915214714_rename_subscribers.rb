class RenameSubscribers < ActiveRecord::Migration[6.1]
  def change
    rename_column :issues, :subscribers_count, :copies_sold
  end
end
