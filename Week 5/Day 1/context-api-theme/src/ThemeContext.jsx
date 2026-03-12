import { createContext } from 'react'
import { useState } from 'react';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    function toggleTheme() {
        const updatedTheme = theme == 'light' ? 'dark' : 'light';
        setTheme(updatedTheme);
    }
    // Context Provider always pass object{not prop} as a context
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}