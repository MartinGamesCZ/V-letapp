import { CFG_BACKEND_ADDR } from "@/config";
import axios from "axios";

export const API = axios.create({
  baseURL: CFG_BACKEND_ADDR,
  headers: {
    "Content-Type": "application/json",
  },
});
