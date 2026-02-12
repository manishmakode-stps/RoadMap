import '../../App.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>&copy; {currentYear} MyBlog. All rights reserved.</p>
        <div className="social-links">
          <span>Twitter</span> | <span>GitHub</span> | <span>LinkedIn</span>
        </div>
      </div>
    </footer>
  );
}
