import { useState } from 'react'

function JsonValidator() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const validate = () => {
    try {
      const parsed = JSON.parse(input)
      setResult({ valid: true, data: parsed })
    } catch (e) {
      setResult({ valid: false, error: e.message })
    }
  }

  return (
    <div>
      <h2>JSON Валідатор</h2>
      <textarea
        rows={8}
        style={{ width: '100%', padding: '10px', boxSizing: 'border-box', fontFamily: 'monospace' }}
        placeholder='Введіть JSON текст для перевірки...'
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={validate} style={{ marginTop: '10px' }}>Перевірити</button>

      {result && (
        <div style={{
          marginTop: '15px', padding: '15px', borderRadius: '8px',
          background: result.valid ? '#e6ffe6' : '#ffe6e6',
          border: `1px solid ${result.valid ? '#99cc99' : '#cc9999'}`
        }}>
          {result.valid ? (
            <>
              <p style={{ color: 'green', fontWeight: 'bold' }}>✓ Валідний JSON</p>
              <pre style={{ overflow: 'auto' }}>{JSON.stringify(result.data, null, 2)}</pre>
            </>
          ) : (
            <>
              <p style={{ color: 'red', fontWeight: 'bold' }}>✗ Невалідний JSON</p>
              <p style={{ color: 'red' }}>{result.error}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default JsonValidator