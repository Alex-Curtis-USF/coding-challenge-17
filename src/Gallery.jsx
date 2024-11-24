import { useState, useEffect } from 'react'

const Gallery = () => {
  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])
  const [expandedTours, setExpandedTours] = useState({})

  const fetchTours = async () => {
    try {
      const response = await fetch('https://www.course-api.com/react-tours-project')
      const data = await response.json()
      setLoading(false)
      setTours(data)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const toggleReadMore = (id) => {
    setExpandedTours(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
      </div>
    )
  }

  if (tours.length === 0) {
    return (
      <div className="refresh-container">
        <h2>no tours left</h2>
        <button className="btn" onClick={fetchTours}>
          refresh
        </button>
      </div>
    )
  }

  return (
    <div className="tours">
      {tours.map((tour) => {
        const { id, image, info, name, price } = tour
        const isExpanded = expandedTours[id] || false

        return (
          <article key={id} className="single-tour">
            <img src={image} alt={name} className="img" />
            <div className="tour-info">
              <h5>{name}</h5>
              <p className="tour-price">${price}</p>
              <p>
                {isExpanded ? info : `${info.substring(0, 200)}...`}
                <button 
                  className="info-btn" 
                  onClick={() => toggleReadMore(id)}
                >
                  {isExpanded ? ' show less' : ' read more'}
                </button>
              </p>
              <button 
                className="delete-btn" 
                onClick={() => removeTour(id)}
              >
                not interested
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default Gallery
