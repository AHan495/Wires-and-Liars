const API_BASE_URL = "http://localhost:3000";

export function getPublicRooms() {
  return fetch(`${API_BASE_URL}/rooms`, {
    credentials: "include",
  }).then((res) => res.json())
}

export function getRoom(roomCode) {
  return fetch(
    `${API_BASE_URL}/rooms/${encodeURIComponent(roomCode)}`,
    {
      credentials: "include",
    },
  ).then((res) => res.json())
}

export function createRoom(name, isPublic) {
  return fetch(`${API_BASE_URL}/rooms`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, public: isPublic }),
  }).then((res) => res.json());
}

export function joinRoom(roomCode) {
  return fetch(
    `${API_BASE_URL}/rooms/${encodeURIComponent(roomCode)}/join`,
    {
      method: "POST",
      credentials: "include",
    },
  ).then((res) => res.json());
}

export function startMatch(roomCode) {
  return fetch(
    `${API_BASE_URL}/rooms/${encodeURIComponent(roomCode)}/start`,
    {
      method: "POST",
      credentials: "include",
    },
  ).then((res) => res.json());
}
