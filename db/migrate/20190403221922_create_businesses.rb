class CreateBusinesses < ActiveRecord::Migration[5.2]
  def change
    create_table :businesses do |t|
      t.string :name
      t.string :website
      t.string :address
      t.text :about

      t.timestamps
    end
  end
end
