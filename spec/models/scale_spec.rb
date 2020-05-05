require 'rails_helper'

RSpec.describe Scale, type: :model do
  it { should have_many(:melodies) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:notes) }

  describe "#note_array" do
    it "returns notes string as an array" do
      scale = Scale.create(name: "A Minor", notes: "D2 E2 F2 G2 A2 B2 C3 D3 E3 F3 G3 A3 B3 C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5")

      expect(scale.note_array).to be_an_instance_of(Array)
      expect(scale.note_array.length).to eq 24
    end
  end
end
