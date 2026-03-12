import {NavLink} from 'react-router-dom'
import './App.css'

function Navbar(){
    return(
        <>
            <ul className="nav-bar">
                   <NavLink className='nav-item' to='/'>Home</NavLink>
                   <NavLink className='nav-item' to='/about'>About</NavLink>
                   <NavLink className='nav-item' to='/contact'>Contact</NavLink>
                   <label htmlFor="toggle">Mode</label>
                   <input type='checkBox' id='toggle' />
            </ul>

        </>
    )
}

export default Navbar;