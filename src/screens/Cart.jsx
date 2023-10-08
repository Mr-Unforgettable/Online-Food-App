import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import trash from '../trash.svg'

export default function Cart () {
  const data = useCart()
  const dispatch = useDispatchCart()

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3" style={{ color: '#fff' }}>The Cart is Empty</div>
      </div>
    )
  }
  const totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={food.id}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      src={trash}
                      alt="delete"
                      onClick={() => {
                        dispatch({
                          type: 'REMOVE',
                          index
                        })
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-white">Total Price: ₹ {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn btn-success mt-5">
            Check Out
          </button>
        </div>
      </div>
    </div>
  )
}
