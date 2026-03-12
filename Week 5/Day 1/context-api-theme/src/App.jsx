import './App.css'
import MainContent from './MainContent.jsx'
import { ThemeProvider } from './ThemeContext.jsx'
import { AuthContext } from './context/AuthContext.jsx'
import ErrorBoundary from './Error/ErrorBoundary.jsx'

function App() {
  return (
    <>
    <ErrorBoundary fallback={"this is fallback message"}>
      <ThemeProvider>
        <AuthContext>
        <MainContent />
        </AuthContext>
      </ThemeProvider>
    </ErrorBoundary>
    </>
  )
}

export default App
