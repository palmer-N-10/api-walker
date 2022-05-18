import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Form from './components/Form';
import Show from './components/Show';

function App() {


  return (
    <fieldset>
      <legend>App.jsx</legend>
      <Router>
        <Routes>
          <Route path="/" element={<Form />}>
            <Route path=":query/:num" element={<Show />} />
          </Route>
        </Routes>
      </Router>
    </fieldset>
  );
}

export default App;