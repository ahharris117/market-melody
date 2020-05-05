class Scale < ApplicationRecord
  has_many :melodies
  validates :name, presence: true
  validates :notes, presence: true

  def note_array
    return notes.split(' ')
  end
end
