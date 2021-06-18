import React from "react";
import "./App.css";
import { UserAuth } from "./hooks/auth-hooks";
import Login from "./pages/login";
import Home from "./pages/home";
import { Route, BrowserRouter } from "react-router-dom";
import { Authcontext } from "./context/auth-context";
import NavBar from "./components/navBar";
import AjoutPlante from "./pages/ajoutPlante";
import AjoutMaladie from "./pages/maladie/ajoutMaladie";
import ListePlante from "./pages/listePlante";
import ListeMaladie from "./pages/maladie/listeMaladie";
import UpdatePlante from "./pages/updatePlante";
import ListeTraitement from "./pages/traitement/liste-traitement";
import AjoutTraitement from "./pages/traitement/ajout-traitement";
import UpdateTraitement from "./pages/traitement/update-traitement";
import UpdateMaladie from "./pages/maladie/update-maladie";


function App() {
  const { token, login, logout, userId } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/plante"  component={ListePlante} />
        <Route path="/ajout-plante"  component={AjoutPlante} />
        <Route path="/update-plante/:id"  component={UpdatePlante} />
        <Route path="/liste-maladie/:id"  component={ListeMaladie} />
        <Route path="/ajout-maladie/:id"  component={AjoutMaladie} />
        <Route path="/update-maladie/:id"  component={UpdateMaladie} />
        <Route path="/liste-traitement/:id"  component={ListeTraitement} />
        <Route path="/ajout-traitement/:id"  component={AjoutTraitement} />
        <Route path="/update-traitement/:id"  component={UpdateTraitement} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Login} />
      </React.Fragment>
    );
  }
  return (
    <div>
      <Authcontext.Provider
        value={{ userId: userId, token: token, login: login, logout: logout }}
      >
        <BrowserRouter>
          {token && <NavBar />}
          <div style={{marginTop:'50px'}}>{routes}</div>
        </BrowserRouter>
      </Authcontext.Provider>
    </div>
  );
}

export default App;
