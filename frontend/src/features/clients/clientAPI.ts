import {ClientsState, ClientState} from "./clientsSlice";

const API_URL = "http://localhost:3000";

export async function fetchClients(page: number) {
  return fetch(`${API_URL}/clients.json?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Error: ", err);
      return {} as ClientsState;
    });
}

export async function fetchClient(clientId: string) {
  return fetch(`${API_URL}/clients/${clientId}.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Error: ", err);
      return {} as ClientState;
    });
}

