class Scale < ApplicationRecord
  has_many :melodies
  validates :name, null: false
  validates :notes, null: false

  def note_array
    return notes.split(' ')  
  end
end
