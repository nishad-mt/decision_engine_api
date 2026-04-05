import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const createDecision = (data) =>
  API.post("/decisions/", data);

export const evaluateDecision = (id, data) =>
  API.post(`/decisions/${id}/evaluate/`, data);