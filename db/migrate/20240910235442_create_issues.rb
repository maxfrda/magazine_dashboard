class CreateIssues < ActiveRecord::Migration[6.1]
  def change
    create_table :issues do |t|
      t.string :cover_image_url
      t.date :publication_date
      t.integer :subscribers_count
      t.integer :number_of_pages

      t.timestamps
    end
  end
end
