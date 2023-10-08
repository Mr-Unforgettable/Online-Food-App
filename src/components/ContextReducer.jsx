import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const cartStateContext = createContext()
const cartDispatchContext = createContext()
const reducer = (state, { type, id, name, qty, price, size, index }) => {
  let updatedState
  switch (type) {
    case 'ADD':
      return [...state, { id, name, qty, price, size }]
    case 'REMOVE':
      // newArr = [...state]
      // newArr.splice(index, 1)
      // return newArr
      updatedState = state.filter((_, currentIndex) => currentIndex !== index)
      return updatedState
    case 'UPDATE':
      return state.map((food) => {
        if (food.id === id) {
          return {
            ...food,
            qty: parseInt(qty),
            price
          }
        }
        return food
      })
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
