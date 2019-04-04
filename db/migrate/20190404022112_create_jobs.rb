class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.string :title
      t.string :schedule_type
      t.date :posted_date
      t.text :requirements
      t.string :pay_range
      t.text :description
      t.string :how_to_apply
      t.belongs_to :business, foreign_key: true

      t.timestamps
    end
  end
end
