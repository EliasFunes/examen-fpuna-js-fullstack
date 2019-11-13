import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-notifications/lib/notifications.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

import Navbar from './components/Navbar';
import Empleados from "./components/Empleados";
import CompleteList from "./components/CompleteList";

const socket = io.connect('http://localhost:8000')
axios.defaults.baseURL = "http://localhost:8000"

function App() {
  return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={() => <CompleteList axios={axios} socket={socket}/>}/>
            <Route exact path="/empleados" component={() => <Empleados axios={axios} socket={socket}/>}/>

          </Switch>
        </Router>
      </div>
  );
}

export default App;
