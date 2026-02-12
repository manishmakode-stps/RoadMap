import '../../App.css';

function About() {
    return (
        <div className="page-container about-section">
            <h1>About Us</h1>
            <p>We are a small team of developers dedicated to building the modern web.</p>
            <div className="team-grid">
                <div className="team-card">
                    <h3>The Mission</h3>
                    <p>To provide high-quality tutorials for beginner developers.</p>
                </div>
            </div>
        </div>
    )
}
export default About;