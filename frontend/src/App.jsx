import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [puntos, setPuntos] = useState('')
  const [valor, setValor] = useState('')
  const [resultado, setResultado] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const puntosArray = puntos.split(';').map(pair => pair.trim().split(',').map(Number))

    try {
      const res = await fetch('/api/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puntos: puntosArray, x: parseFloat(valor) })
      })
      const data = await res.json()
      setResultado(data.resultado)
    } catch (error) {
      console.error('Error al calcular:', error)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Interpolación de Newton</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Puntos (x,y) separados por ;</label>
                <input className="form-control" value={puntos} onChange={e => setPuntos(e.target.value)} placeholder="Ej. 1,2; 2,3; 3,5" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Valor de x</label>
                <input className="form-control" type="number" value={valor} onChange={e => setValor(e.target.value)} required />
              </div>
              <button className="btn btn-primary w-100" type="submit">Calcular</button>
            </form>
            {resultado !== null && (
              <div className="alert alert-success mt-4">
                Resultado: <strong>{resultado}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;