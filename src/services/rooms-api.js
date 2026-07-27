const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function getPublicRooms() {
  return fetch(`${API_BASE_URL}/rooms`, {
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function getRoom(roomCode) {
  return fetch(`${API_BASE_URL}/rooms/${encodeURIComponent(roomCode)}`, {
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function getMatchHistories() {
  return fetch(`${API_BASE_URL}/rooms/histories`, {
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function createRoom(name, isPublic) {
  return fetch(`${API_BASE_URL}/rooms`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, public: isPublic }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function joinRoom(roomCode) {
  return fetch(`${API_BASE_URL}/rooms/${encodeURIComponent(roomCode)}/join`, {
    method: "POST",
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function startMatch(roomCode) {
  return fetch(`${API_BASE_URL}/rooms/${encodeURIComponent(roomCode)}/start`, {
    method: "POST",
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function endMatch(roomCode) {
  return fetch(`${API_BASE_URL}/rooms/${encodeURIComponent(roomCode)}/end`, {
    method: "POST",
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function deleteRoom(roomCode) {
  return fetch(`${API_BASE_URL}/rooms/${encodeURIComponent(roomCode)}`, {
    method: "DELETE",
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function leaveRoom(roomCode) {
  return fetch(`${API_BASE_URL}/rooms/${encodeURIComponent(roomCode)}/leave`, {
    method: "POST",
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}

export function voteInMatch(roomCode, targetId) {
  return fetch(`${API_BASE_URL}/rooms/${encodeURIComponent(roomCode)}/vote`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ targetId }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error();
    }
    return res.json();
  });
}
