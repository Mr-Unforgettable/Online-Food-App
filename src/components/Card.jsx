import React from 'react'
import PropTypes from 'prop-types'

export default function Card (props) {
  const { foodName, options, image, description, size } = props
  const priceOptions = Object.keys(options)

  return (
    <div>
      <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
        <img src={image} height={size} width={size} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{foodName}</h5>
          <p>{description}</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                )
              })}
            </select>
            <select className="m-2 h-100 bg-success rounded">
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className="d-inline h-100 fs-5">Total Price</div>
          </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  foodName: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string,
  size: PropTypes.number
}
