import { useState } from 'react'

const quotes = [
  { text: "Життя — це те, що відбувається, поки ти будуєш інші плани.", author: "Джон Леннон" },
  { text: "Будь змінами, які ти хочеш бачити у світі.", author: "Махатма Ганді" },
  { text: "Єдиний спосіб робити велику роботу — любити те, що ти робиш.", author: "Стів Джобс" },
  { text: "Успіх — це йти від невдачі до невдачі, не втрачаючи ентузіазму.", author: "Вінстон Черчілль" },
  { text: "Не чекай. Час ніколи не буде ідеальним.", author: "Наполеон Хілл" },
]

function Quote() {
  const [quote, setQuote] = useState(null)

  const getQuote = () => {
    const json = JSON.stringify(quotes)
    const parsed = JSON.parse(json)
    const random = parsed[Math.floor(Math.random() * parsed.length)]
    setQuote(random)
  }

  return (
    <div>
      <h2>Цитата дня</h2>
      <button onClick={getQuote}>Отримати випадкову цитату</button>
      {quote && (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <p style={{ fontSize: '18px', fontStyle: 'italic' }}>"{quote.text}"</p>
          <p style={{ color: '#666' }}>— {quote.author}</p>
        </div>
      )}
    </div>
  )
}

export default Quote