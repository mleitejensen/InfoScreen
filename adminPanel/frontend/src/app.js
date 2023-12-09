import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Order from './pages/Order';
import Users from './pages/Users';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />}
            />
            <Route 
              path="/order" 
              element={<Order />} 
            />
            <Route 
              path="/users" 
              element={<Users />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;