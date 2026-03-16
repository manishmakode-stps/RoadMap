import { useQuery, useQueries, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";

// handling the loading state using keepPreviousData to avoid showing the loading state when changing pages, and instead show the previous data until the new data is loaded. This provides a smoother user experience when paginating through data.

const fetchPosts = async (page) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
    return res.data;
};

// const getUsers = async () => {
//     const res = await axios.get("https://jsonplaceholder.typicode.com/ussers");
//     return res.data;
// };

const WithQuery = () => {
    const [page, setPage] = useState(1);

    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ["postData", page],
        queryFn: () => fetchPosts(page),
        staleTime: 10000,
        cacheTime: 300000,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData, // This option allows us to keep the previous data while fetching new data, preventing the loading state from showing during pagination.
    });

    // const { data: users } = useQuery({
    //     queryKey: ["users"],
    //     queryFn: getUsers,
    // });

    // Independent parallel queries with useQueries
    // const[{isPending,data,error},{data:users}] = useQueries({
    //     queries:[
    //         {queryKey: ["postData"], queryFn: fetchPosts, staleTime:10000, cacheTime: 300000, refetchOnWindowFocus: true},
    //         {queryKey: ["users"], queryFn: getUsers},
    //     ]
    // })

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
                <section className="panel between">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <p className="subtitle">Current Page: {page}</p>
                    <button
                        className="btn"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </section>
            </div>
        </div>
    );
};

export default WithQuery;
