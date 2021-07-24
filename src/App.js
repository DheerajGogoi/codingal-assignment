import React from 'react';
import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Posts from './components/Posts/Posts';
import Passengers from './components/Passengers/Passengers';

function App() {
  return (
    <div>
      <Navbar />
      {/* <Router>
        <Switch>
          <Route path="/posts">
            
          </Route>
          <Route path="/passengers">
            
          </Route>
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
