import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";

export const getData = async (offset) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/pokemon?limit=8&offset=${offset}`
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getPokemonDetails = async (url) => {
  try {
    const response = await axios.get(`${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
