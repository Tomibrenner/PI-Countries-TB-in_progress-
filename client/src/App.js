import './App.css';
import {Home, Landing, Detail, Form, NotFound} from './views'
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/countries/:id' component={Detail} />
      <Route exact path='/activities' component={Form} />
      <Route exact path='*' component={NotFound} />
    </Switch>
    </>
  );
}

export default App;
