import axios from "axios";

let cat;

const randomCats = axios
  .get(
    `https://api.thecatapi.com/v1/images/search?api_key=8560747d-c86e-4f9b-aafc-841f5fd91849`
  )
  .then((response) => {
    cat = response.data[0].url;
  });

export { randomCats };
export { cat };
