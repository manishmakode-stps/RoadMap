import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="page">
      <div className="container stack">
        <section className="card section center stack-sm">
          <span className="pill">React Query Demo</span>
          <h1 className="title">Compare fetching with and without React Query</h1>
          <p className="subtitle">
            Open either example to see the same posts rendered with different data-fetching patterns.
          </p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <Link to="/with-query" className="btn">With Query</Link>
            <Link to="/without-query" className="btn btn-secondary">Without Query</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
