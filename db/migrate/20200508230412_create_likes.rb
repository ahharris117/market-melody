class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.belongs_to :user, null: false
      t.belongs_to :melody, null: false

      t.timestamps null: false
    end
  end
end
