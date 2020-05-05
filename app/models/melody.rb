class Melody < ApplicationRecord
  belongs_to :user
  belongs_to :scale
  belongs_to :stock

  def get_melody
    root_index = 11
    indices = stock.index
    note_array = scale.note_array
    last_note = indices.first
    melody = indices.map do |index|
      if last_note > root_index
        diff = last_note - root_index
        index = note_array[index - diff]
      elsif last_note < root_index
        diff = root_index - last_note
        index = note_array[index + diff]
      else
        index = note_array[index]
      end
    end
    final_melody = melody.reverse()
    return final_melody
  end

  def get_name
    return "#{stock.symbol.upcase} in #{scale.name}"
  end
end
