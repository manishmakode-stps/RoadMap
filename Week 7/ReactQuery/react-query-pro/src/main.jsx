import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import WithoutQuery from './pages/WithoutQuery.jsx';
import WithQuery from './pages/WithQuery.jsx';
import Fallback from './pages/Fallback.jsx';
import WithInfiniteQuery from './pages/WithInfiniteQuery.jsx';
import Tasks from './pages/Tasks.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Post from './pages/Post.jsx';


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false,
      retryDelay: 3000,
      retry: 2,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/without-query",
    element: <WithoutQuery />,
  },
  {
    path: "/with-query",
    element: <WithQuery />,
  },
  {
    path: "with-query/:postId",
    element: <Post />,
  },
  {
    path: "without-query/:postId",
    element: <Post />,
  },
  { path: "*", 
    element: <Fallback/>,
  },
  {
    path: "/with-infinite-query",
    element: <WithInfiniteQuery />,
  },
  {
    path:"/tasks",
    element: <Tasks />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
