import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const cartStateContext = createContext()
const cartDispatchContext = createContext()
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: action.id, name: action.name, qty: action.qty, price: action.price, size: action.size }]
    default:
      console.log('Error in the reducer')
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [])
  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(cartStateContext)
export const useDispatchCart = () => useContext(cartDispatchContext)

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
}
