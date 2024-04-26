// TODO: Complete, add all the fields.
export type SgfData = {
  // 1. Metadata
  GM?: '1' // Game Type (GM = "1" is Go)
  FF?: string // File Format
  CA?: string // Character Set
  AP?: string // Application used to produce the file
  // 2. Game Info
  KM?: string // Komi
  SZ?: string // Board Size
  DT?: string // Date
  HA?: string // Number of Handicap Stones
  RU?: string // Rules Set in Use
  GN?: string // Game Name
  EV?: string // Event
  // 3. Players
  PB?: string // Black Player
  BR?: string // Black's Rating
  PW?: string // White Player
  WR?: string // White's Rating
  // 4. Comments
  C?: string // (Move) Comments
  GC?: string // Game Comment
  // 5. Editing the Goban
  PL?: string // Who plays next
  AB?: string // Add Black stones
  AW?: string // Add White stones
  // 6. Moves
  B?: string // What Black plays
  W?: string // What White Plays
}
