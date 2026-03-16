import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import "../App.css";

const getComments = async (postId) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return res.data;
};

const getPost = async (postId) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return res.data;
};

const Post = () => {
    const { postId } = useParams();
    const location = useLocation();
    const backLink = location.pathname.startsWith("/without-query") ? "/without-query" : "/with-query";

    const { isPending, error, data } = useQuery({
        queryKey: ["post", postId],
        queryFn: () => getPost(postId),
        staleTime: 30000,
        enabled: !!postId,
    });

    const {
        isPending: isCommentPending,
        error: commentsError,
        data: comments,
    } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => getComments(postId),
        enabled: !!postId,
    });

    if (isPending) {
        return (
            <div className="page">
                <div className="container">
                    <div className="status status-loading center">Loading post...</div>
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
                <section className="card stack-sm">
                    <div className="between">
                        <span className="pill">Post #{data.id}</span>
                        <Link to={backLink} className="btn btn-secondary">Back to posts</Link>
                    </div>
                    <article className="post-card">
                        <h2>{data.title}</h2>
                        <p>{data.body}</p>
                    </article>
                </section>

                <section className="card stack">
                    <h2 className="title">Comments</h2>
                    {isCommentPending && (
                        <div className="status status-loading">Loading comments...</div>
                    )}
                    {commentsError && (
                        <div className="status status-error">Error: {commentsError.message}</div>
                    )}
                    {comments && (
                        <div className="list">
                            {comments.map((comment) => (
                                <article key={comment.id} className="post-card stack-sm">
                                    <h3>{comment.name}</h3>
                                    <p className="muted">{comment.email}</p>
                                    <p>{comment.body}</p>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Post;
