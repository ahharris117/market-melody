class CreateScalesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :scales do |t|
      t.string :name, null: false
      t.string :notes, null: false
      
      t.timestamps null: false
    end
  end
end
