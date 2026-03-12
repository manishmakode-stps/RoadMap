import { Suspense, lazy } from "react";
import "./App.css";

const MoviePage = lazy(() => import("./pages/MoviePage"));

function App() {
  return (
    <Suspense fallback={<div className="app-loading">Loading app...</div>}>
      <MoviePage />
    </Suspense>
  );
}

export default App;