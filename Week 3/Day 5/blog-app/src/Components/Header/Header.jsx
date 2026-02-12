import { NavLink } from 'react-router-dom';
import '../../App.css';

export default function Header() {
  return (
    <header className="main-header">
      <div className="logo">MyBlog<span>.</span></div>
      <nav className="navbar">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/blogs" className="nav-link">Blogs</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
      </nav>
    </header>
  );
}
