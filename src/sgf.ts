export type SgfString = string
export type SgfBranchString = string

/**
 * [CWI - SGF Format](https://homepages.cwi.nl/~aeb/go/misc/sgf.html)
 */
export type SgfProperties = (
  | RootNodeProperties
  | NodeProperties
) & { [key: string]: string | string[] }

export type RootNodeProperties = Partial<{
  // 0. Game Types
  GM: string // Game Type (GM = "1" is Go)

  // 1. Players
  PB: string // Black Player
  PW: string // White Player
  BR: string // Black's Rating
  WR: string // White's Rating
  BC: string // Black's Countries
  WC: string // White's Countries
  BT: string // Black's Team(s)
  WT: string // White's Team(s)

  // 2. Event
  EV: string // Event
  RO: string // Round
  DT: string // Date
  JT: string // Japanese Date
  PC: string // Place

  // 3. Game Details
  TM: string // Time available to each player
  OT: string // Overtime type and description
  LC: string // Number of overtimes
  LT: string // Length of overtime
  KM: string // Komi
  HA: string // Number of Handicap Stones
  SZ: string // Board Size
  AB: string[] // Add Black stones
  AW: string[] // Add White stones
  AE: string // Add Empty (to force a position into one color)
  PL: string // Who plays next
  RU: string // Rules Set in Use
  RE: string // Result
  TB: string // Final Black territory
  TW: string // Final White territory
  MN: string // Number of moves in the game
  GC: string // Game comments

  // 4. Meta Properties
  CA: string // Character Set
  FF: string // File Format
  AP: string // Application used to produce the file
  SO: string // Source of information
  US: string // User who typed it in
  AN: string // Annotator, the author of the comments
  CP: string // Copyright information
  GN: string // Game Name, filename
}>

export type NodeProperties = Partial<{
  // 1. Move Properties
  B: string // What Black plays
  W: string // What White Plays
  C: string // (Move) Comments
  BL: string // Time left for Black (after a Black move)
  WL: string // Time left for White (after a White move)
  OB: string // Number of Black stones that still need to be used in this period (Canadian byo-yomi).
  OW: string // Number of White stones that still need to be used in this period (Canadian byo-yomi). In Japanese byo-yomi, it's used to the number of remaining periods.

  // 2. Markup Properties
  SL: string[] // Selects a number of unnamed points
  CR: string[] // Circle
  SQ: string[] // Square
  TR: string[] // Triangle
  MA: string[] // "X" mark
  LB: string[] // Labels
  N: string // Names its node
  MN: string // Assigns a number to its node, probably for display purposes

  // 3. Display Properties
  VW: string // The part of the board that should be viewed
}>
