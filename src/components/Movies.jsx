import { useState } from 'react'

const initialMovies = [
  { id: 1, title: 'Inception', genre: 'Фантастика', year: 2010, review: 'Геніальний фільм про сни' },
  { id: 2, title: 'The Godfather', genre: 'Драма', year: 1972, review: 'Класика кіно' },
  { id: 3, title: 'Interstellar', genre: 'Фантастика', year: 2014, review: 'Вражаюча наукова фантастика' },
  { id: 4, title: 'Parasite', genre: 'Трилер', year: 2019, review: 'Корейське кіномистецтво' },
]

function Movies() {
  const [movies, setMovies] = useState(initialMovies)
  const [search, setSearch] = useState('')
  const [genreFilter, setGenreFilter] = useState('Всі')
  const [sortBy, setSortBy] = useState('title')
  const [form, setForm] = useState({ title: '', genre: '', year: '', review: '' })
  const [showForm, setShowForm] = useState(false)

  const genres = ['Всі', ...new Set(movies.map(m => m.genre))]

  const filtered = movies
    .filter(m => genreFilter === 'Всі' || m.genre === genreFilter)
    .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'year') return b.year - a.year
      return 0
    })

  const addMovie = () => {
    if (!form.title || !form.genre || !form.year) return
    const newMovie = { ...form, id: Date.now(), year: parseInt(form.year) }
    setMovies([...movies, newMovie])
    setForm({ title: '', genre: '', year: '', review: '' })
    setShowForm(false)
  }

  const deleteMovie = (id) => {
    setMovies(movies.filter(m => m.id !== id))
  }

  return (
    <div>
      <h2>Фільми</h2>

      {/* Пошук, фільтр, сортування — Рівень 4 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          placeholder="Пошук за назвою..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)} style={{ padding: '8px' }}>
          {genres.map(g => <option key={g}>{g}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '8px' }}>
          <option value="title">За назвою</option>
          <option value="year">За роком</option>
        </select>
        <button onClick={() => setShowForm(!showForm)}>+ Додати фільм</button>
      </div>

      {/* Форма додавання — Рівень 3 */}
      {showForm && (
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>Новий фільм</h3>
          <input placeholder="Назва" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '8px', boxSizing: 'border-box' }} />
          <input placeholder="Жанр" value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '8px', boxSizing: 'border-box' }} />
          <input placeholder="Рік" type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '8px', boxSizing: 'border-box' }} />
          <textarea placeholder="Рецензія" value={form.review} onChange={e => setForm({ ...form, review: e.target.value })} style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '8px', boxSizing: 'border-box' }} rows={3} />
          <button onClick={addMovie}>Зберегти</button>
        </div>
      )}

      {/* Список фільмів */}
      {filtered.length === 0 && <p>Фільмів не знайдено.</p>}
      {filtered.map(movie => (
        <div key={movie.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>{movie.title} ({movie.year})</h3>
            <button onClick={() => deleteMovie(movie.id)} style={{ background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '4px 10px' }}>Видалити</button>
          </div>
          <p style={{ color: '#666', margin: '5px 0' }}>Жанр: {movie.genre}</p>
          <p style={{ margin: '5px 0' }}>{movie.review}</p>
        </div>
      ))}
    </div>
  )
}

export default Movies