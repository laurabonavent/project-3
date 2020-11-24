import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <div className='App'>
      <Switch>
        {/* <Route exact path='/' component={Home} /> */}
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        {/* <Route exact path='/profile' component={Profile} />
        <Route exact path='/edit-profile' component={EditProfile} />
        <Route exact path='/ressources/:id' component={Ressource} />
        <Route exact path='/ressources/create' component={CreateRessource} />
        <Route exact path='/ressources/edit/:id' component={EditRessource} /> */}
      </Switch>
    </div>
  );
}

export default App;
