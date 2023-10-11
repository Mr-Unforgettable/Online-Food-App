import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function MyOrder () {
  const [orderData, setOrderData] = useState([])

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail')
    if (!userEmail) return

    try {
      const response = await fetch('http://localhost:3001/api/myOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setOrderData(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchMyOrder()
  }, [])

  return (
    <>
      <Navbar />

      <div className="container">
        {Array.isArray(orderData) &&
          orderData[0].orderData.order_data.map((order, index) => {
            const orderItems = order[0]
            const orderDate = order[1]

            return (
              <div key={index}>
                <div className="m-auto mt-5">
                  {orderDate}
                  <hr />
                </div>

                {orderItems.map((item, itemIndex) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-3" key={itemIndex}>
                      <div className="card mt-3">
                        <img
                          src={item.img}
                          className="card-img-top"
                          alt="..."
                          style={{ height: '120px', objectFit: 'fill' }}
                        />

                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>

                          <div
                            className="container w-100 p-0"
                            style={{ height: '38px' }}
                          >
                            <span className="m-1">{item.qty}</span>
                            <span className="m-1">{item.size}</span>
                            <span className="m-1">{orderDate}</span>
                            <div className="d-inline ms-2 h-100 w-20 fs-5">
                              ₹{item.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
      </div>

      <Footer />
    </>
  )
}
