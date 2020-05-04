class CreateMelodiesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :melodies do |t|
      t.belongs_to :user
      t.belongs_to :scale
      t.belongs_to :stock
      
      t.timestamps null: false
    end
  end
end
