import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Order from './pages/Order';
import Users from './pages/Users';

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={!user ? <Home /> : <Navigate to="/order"/>}
            />
            <Route 
              path="/order" 
              element={user ? <Order /> : <Navigate to="/"/>} 
            />
            <Route 
              path="/users" 
              element={user ? <Users /> : <Navigate to="/"/>} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;