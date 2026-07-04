export const sampleRooms = [
  {
    id: "AI-7QK9",
    name: "Example 1",
    host: "User 1",
    players: 1,
    public: true,
  },
  {
    id: "ZX-2LM4",
    name: "Example 2",
    host: "User 2",
    players: 1,
    public: true,
  },
  {
    id: "MN-5TR8",
    name: "Example 3",
    host: "User 3",
    players: 1,
    public: true,
  },
  {
    id: "QP-8DS1",
    name: "Example 4",
    host: "User 4",
    players: 1,
    public: true,
  },
];

export const defaultRoom = {
  id: "AI-7QK9",
  name: "Waiting Room",
  host: "You",
  players: 1,
  public: true,
};

// Function to create a draft room object with default values
export function createDraftRoom({
  id,
  name,
  host = "You",
  players = 1,
  public: isPublic,
}) {
  return {
    id,
    name,
    host,
    players,
    public: isPublic,
  };
}

// Function to generate a random room code
export function generateRoomCode() {
  return `RM-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
