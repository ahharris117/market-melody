# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Scale.create(name: "A Minor", notes: "D2 E2 F2 G2 A2 B2 C3 D3 E3 F3 G3 A3 B3 C4 D4 E4 F4 G4 A4 B4 C5 D5 E5 F5")
Scale.create(name: "A Harmonic Minor", notes: "D2 E2 F2 G#2 A2 B2 C3 D3 E3 F3 G#3 A3 B3 C4 D4 E4 F4 G#4 A4 B4 C5 D5 E5 F5")
Scale.create(name: "A Melodic Minor", notes: "D2 E2 F#2 G#2 A2 B2 C3 D3 E3 F#3 G#3 A3 B3 C4 D4 E4 F#4 G#4 A4 B4 C5 D5 E5 F#5")
Scale.create(name: "A Wholetone", notes: "B2 C#2 D#2 F2 G2 A2 B2 C3 D#3 F3 G3 A3 B3 C#4 D#4 F4 G4 A4 B4 C#5 D#5 F5 G5")
Scale.create(name: "A Symetric Diminished", notes: "F2 F#2 G#2 A2 B2 C3 D3 D#3 F3 F#3 G#3 A3 B3 C4 D4 D#4 F4 F#4 G#4 A4 B4 C5 D5")
Scale.create(name: "A Dorian", notes: "D2 E2 F#2 G2 A2 B2 C3 D3 E3 F#3 G3 A3 B3 C4 D4 E4 F#4 G4 A4 B4 C5 D5 E5 F#5")
Scale.create(name: "A Mixolydian", notes: "D2 E2 F#2 G2 A2 B2 C#3 D3 E3 F#3 G3 A3 B3 C#4 D4 E4 F#4 G4 A4 B4 C#5 D5 E5 F#5")
Scale.create(name: "A Blues", notes: "C2 D2 D#2 E2 G2 A2 C3 D3 D#3 E3 G3 A3 C4 D4 D#4 E4 G4 A4 C5 D5 D#5 E5 G5 A5")
Scale.create(name: "Cmaj7 (arpeggio)", notes: "E1 G1 B1 C2 E2 G2 B2 C3 E3 G3 B3 C4 E4 G4 B4 C5 E5 G5 B5 C6 E6 G6 B6 C7")
Scale.create(name: "Emin7b5 (arpeggio)", notes: "E1 G1 Bb1 D2 E2 G2 Bb2 D3 E3 G3 Bb3 D4 E4 G4 Bb4 D5 E5 G5 Bb5 D6 E6 G6 Bb6 D7")
Scale.create(name: "Cminmaj7 (arpeggio)", notes: "Eb1 G1 B1 C2 Eb2 G2 B2 C3 Eb3 G3 B3 C4 Eb4 G4 B4 C5 Eb5 G5 B5 C6 Eb6 G6 B6 C7")
Scale.create(name: "Cmaj7sharp5 (arpeggio)", notes: "E1 G#1 B1 C2 E2 G#2 B2 C3 E3 G#3 B3 C4 E4 G#4 B4 C5 E5 G#5 B5 C6 E6 G#6 B6 C7")
