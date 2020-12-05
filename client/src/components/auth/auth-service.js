import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/", // lien vers BD
  withCredentials: true, //ça transmets des cookies, ça envoie en même temps le cookies
});

export default service;

// SIGNUP
function signup(email, username, password, level, role, avatar) {
  return service
    .post("/signup", {
      email: email,
      username: username,
      password: password,
      level: level,
      role: role,
      avatar: avatar,
    })
    .then((response) => {
      return response.data;
    });
}

export { signup };

// EDIT SIGNUP
function editSignup(email, username, password, level, role, avatar) {
  return service
    .put("/user", {
      email: email,
      username: username,
      password: password,
      level: level,
      role: role,
      avatar: avatar,
    })
    .then((response) => {
      return response.data;
    });
}
export { editSignup };

// LOGIN
function login(email, password) {
  return service
    .post("/login", { email, password })
    .then((response) => response.data);
}
export { login };

// LOGOUT
function logout() {
  return service.post("/logout", {}).then((response) => response.data);
}
export { logout };

// LOGGED IN
function loggedin() {
  return service.get("/loggedin").then((response) => response.data);
}
export { loggedin };

// USER + FAVORITES
function getUser() {
  return service.get("/user").then((response) => response.data);
}
export { getUser };

//  ONLY FAVORITES
function getFavorites() {
  return service.get("/user/favorites").then((response) => response.data);
}
export { getFavorites };

// UPLOAD Image
function uploadImage(formdata) {
  return service
    .post("/upload/image", formdata)
    .then((response) => response.data);
}
export { uploadImage };

// UPLOAD PHOTO
function upload(formdata) {
  return service.post("/upload", formdata).then((response) => response.data);
}
export { upload };

function saveAvatar(data) {
  return service.post("/upload", data).then((response) => response.data);
}
export { saveAvatar };

// RESSOURCES
function getRessources() {
  return service.get("/ressources").then((response) => response.data);
}
export { getRessources };

function getOneRessource(id) {
  return service.get(`/ressources/${id}`).then((response) => response.data);
}

export { getOneRessource };

function getEnumValues() {
  return service.get("/enumvalues").then((response) => response.data);
}
export { getEnumValues };

// CREATE RESSOURCE
function createRessource(
  title,
  description,
  //image,
  link,
  language,
  technology,
  type,
  level,
  price
) {
  return service
    .post("/ressources", {
      title,
      description,
      //image,
      link,
      language,
      technology,
      type,
      level,
      price,
    })
    .then((response) => {
      console.log("create response", response);
      return response.data;
    })
    .catch((error) => console.log(error));
}

export { createRessource };

// EDIT RESSOURCE
function editRessource(
  title,
  description,
  //image,
  link,
  language,
  technology,
  type,
  level,
  price,
  id
) {
  return service
    .put(`/ressources/${id}`, {
      title,
      description,
      //image,
      link,
      language,
      technology,
      type,
      level,
      price,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
}

export { editRessource };

// // ADD FAVORITES
function addFavorite(id) {
  return service
    .post(`/ressources/${id}/favorites`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export { addFavorite };

// /DELETE FAVORITES
function deleteFavorite(id) {
  return service
    .delete(`/favorites/${id}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export { deleteFavorite };
