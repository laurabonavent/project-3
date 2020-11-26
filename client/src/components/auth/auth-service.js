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
      console.log("coucou")
      return response.data
    });
}

export { signup };

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
