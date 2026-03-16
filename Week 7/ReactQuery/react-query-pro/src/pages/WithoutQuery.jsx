import { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

const WithoutQuery = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((posts) => {
                setData(posts);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="page">
                <div className="container">
                    <div className="status status-loading center">Loading posts...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <div className="container">
                    <div className="status status-error center">Error: {error.message}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="container stack">
                <section className="card section center stack-sm">
                    <span className="pill">Without React Query</span>
                    <h1 className="title">Post Data</h1>
                    <p className="subtitle">This page fetches posts manually with `useEffect` and local state.</p>
                    <div className="row" style={{ justifyContent: "center" }}>
                        <Link to="/with-query" className="btn">With Query Page</Link>
                    </div>
                </section>

                <section className="post-list">
                    {data.map((post) => (
                        <Link to={`/without-query/${post.id}`} key={post.id} className="post-card">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </Link>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default WithoutQuery;
