import { useState, useEffect } from 'react'

const Gallery = () => {
  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])
  const [expandedTours, setExpandedTours] = useState({})

  const fetchTours = async () => {
    const url = 'https://www.course-api.com/react-tours-project'  // Updated URL
    
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setTours(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching tours:', error)
      setLoading(false)
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
      <main>
        <section className="section-center">
          <h2>Our Tours</h2>
          <div className="loading"></div>
        </section>
      </main>
    )
  }

  if (tours.length === 0) {
    return (
      <main>
        <section className="section-center">
          <h2>no tours left</h2>
          <button className="btn" onClick={fetchTours}>
            refresh
          </button>
        </section>
      </main>
    )
  }

  return (
    <div className="section-center">
      <div className="title">
        <h2>Our Tours</h2>
        <div className="underline"></div>
      </div>
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
    </div>
  )
}

export default Gallery