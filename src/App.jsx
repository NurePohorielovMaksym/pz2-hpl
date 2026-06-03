import { useState } from 'react'
import Quote from './components/Quote'
import JsonValidator from './components/JsonValidator'
import Movies from './components/Movies'

function App() {
  const [page, setPage] = useState('movies')

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setPage('movies')}>Фільми</button>
        <button onClick={() => setPage('quote')}>Цитата дня</button>
        <button onClick={() => setPage('validator')}>JSON валідатор</button>
      </nav>

      {page === 'movies' && <Movies />}
      {page === 'quote' && <Quote />}
      {page === 'validator' && <JsonValidator />}
    </div>
  )
}

export default App