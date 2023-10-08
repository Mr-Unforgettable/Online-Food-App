import './App.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
// import MyOrder from './screens/MyOrder'
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
            {/* <Route exact path='/myOrders' element={<MyOrder />} /> */}
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
