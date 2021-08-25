import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Cadastro from './pages/Cadastro';
import Consulta from './pages/Consulta';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/cadastro" exact component={Cadastro} />
            <Route path="/consulta" exact component={Consulta} />
            <Route path="*" component={Consulta} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
