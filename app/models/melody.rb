class Melody < ApplicationRecord
  belongs_to :user
  belongs_to :scale
  belongs_to :stock

  def get_melody
    root_index = 11
    index = stock.index
    note_array = scale.note_array
    last_note = index.first
    melody = index.map do |number|
      if last_note > root_index
        diff = last_note - root_index
        number = note_array[number - diff]
      elsif last_note < root_index
        diff = root_index - last_note
        number = note_array[number + diff]
      else
        number = note_array[number]
      end
    end
    final_melody = melody.reverse()
    return final_melody
  end
end
