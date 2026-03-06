export interface Driver {
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  headshot_url: string;
}

export interface Session {
  session_key: number;
  session_name: string;
  circuit_short_name: string;
  date: string;
}

export interface Lap {
  lap_number: number;
  lap_duration: number;
  is_pit_out_lap: boolean;
  duration_sector_1: number;
  duration_sector_2: number;
  duration_sector_3: number;
}