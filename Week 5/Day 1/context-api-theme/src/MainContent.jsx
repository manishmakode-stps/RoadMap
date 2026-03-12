import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './App.css'
import { useAuth } from './context/AuthContext';
function MainContent() {
    const {user} = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <>
            <div className={`${theme=='light'?'dark':'light'}`}>
                <button onClick={toggleTheme}>Toggle Theme</button>
                <h1>the current theme is {theme} and {user} is logged in</h1>
            </div>
        </>
    )
}

export default MainContent;