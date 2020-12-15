import axios from "axios";

const randomCats = axios.create({
  baseURL: `https://api.thecatapi.com/images/search?api_key=8560747d-c86e-4f9b-aafc-841f5fd91849`,
  withCredentials: true, //ça transmets des cookies, ça envoie en même temps le cookies,
});

export default randomCats;

function getCats() {
  return randomCats.get("/").then((response) => {
    return response.data;
  });
}

export { getCats };
