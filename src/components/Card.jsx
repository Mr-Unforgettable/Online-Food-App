import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useCart, useDispatchCart } from './ContextReducer'

export default function Card (props) {
  const { foodItem, options } = props
  const dispatch = useDispatchCart()
  const data = useCart()
  const priceRef = useRef()
  const priceOptions = Object.keys(options)
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('')
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item
        break
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: 'UPDATE',
          id: foodItem._id,
          price: finalPrice,
          qty
        })
      } else if (food.size !== size) {
        await dispatch({
          type: 'ADD',
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty,
          size
        })
        return
      }
      // console.log(data)
      return
    }
    await dispatch({
      type: 'ADD',
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty,
      size
    })
  }

  const finalPrice = qty * parseInt(options[size])
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: '150px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          {/* <p>{foodItem.description}</p> */}
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => {
                setQty(e.target.value)
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                )
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => {
                setSize(e.target.value)
              }}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                )
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className={'btn btn-success justify-center ms-2'}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  foodItem: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
}
