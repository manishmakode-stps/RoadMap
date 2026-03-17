import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const fetchPosts = async (page) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page.pageParam}&_limit=10`);
    return res.data;
};

// there will be a single cache for all the pages, and we will be adding the new pages to that cache as we fetch them.

const WithInfiniteQuery = () => {

    const { ref, inView } = useInView();
    const { isPending, error, data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["postData"],
        queryFn: fetchPosts,
        staleTime: 10000,
        cacheTime: 300000,
        refetchOnWindowFocus: true,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 0 ? null : allPages.length + 1;
        }
    });

    useEffect(() => {
        fetchNextPage();
    }, [inView])

    const posts = data ? data.pages.flat() : [];

    if (isPending) {
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
                    <span className="pill">With React Query</span>
                    <h1 className="title">Post Data With Query</h1>
                    <p className="subtitle">Posts are cached and paginated with TanStack Query.</p>
                    <div className="row" style={{ justifyContent: "center" }}>
                        <Link to="/without-query" className="btn btn-secondary">Without Query Page</Link>
                    </div>
                </section>

                <div className={`${isFetching ? "post-list post-list-fade" : "post-list"}`}>
                    <section className="post-list">
                        {posts.map((post) => (
                            <Link to={`/with-query/${post.id}`} key={post.id} className="post-card">
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </Link>
                        ))}
                    </section>
                </div>

                <section className="panel between">
                    {hasNextPage && <div ref={ref} style={{ backgroundColor: "blue", height: "100px", }}>
                    </div>
                    }

                    {/* <button
                        className="btn btn-secondary"
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                    >
                        Load More
                    </button> */}
                    {/* <p className="subtitle">Current Page: {page}</p> */}
                    {/* <button
                        className="btn"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button> */}
                </section>
            </div>
        </div>
    );
};

export default WithInfiniteQuery;
