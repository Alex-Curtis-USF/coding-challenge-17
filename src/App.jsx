import { useState } from 'react'
import Gallery from './Gallery.jsx'
import './App.css'

function App() {
  return (
    <main>
      <section>
        <div className="title">
          <h2>Our Tours</h2>
          <div className="underline"></div>
        </div>
        <Gallery />
      </section>
    </main>
  )
}

export default App
