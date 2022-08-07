import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Countries from './countries/Countries';
import Home from './home/Home';

function App() {
  return (
    <div className="App">
      {/* <Countries /> */}
      {/* <Home /> */}
    
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/country/:countryId" element={<Countries />} />

        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
