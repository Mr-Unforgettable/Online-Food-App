import './App.css'
import Home from './screens/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Login from './screens/Login'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Signup from './screens/Signup'
import { CartProvider } from './components/ContextReducer'

function App () {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
