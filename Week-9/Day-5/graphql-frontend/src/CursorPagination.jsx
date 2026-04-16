import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts($limit: Int!, $after: String) {
    getPosts(limit: $limit, after: $after) {
      edges {
        node {
          id
          title
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const CursorPagination = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { limit: 5, after: null },
    notifyOnNetworkStatusChange: true,
  });

  const edges = data?.getPosts?.edges ?? [];
  const pageInfo = data?.getPosts?.pageInfo;

  const loadNextPage = async () => {
    if (!pageInfo?.hasNextPage) return;

    await fetchMore({
      variables: {
        limit: 5,
        after: pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          getPosts: {
            __typename: prev.getPosts.__typename,
            edges: [
              ...prev.getPosts.edges,
              ...fetchMoreResult.getPosts.edges,
            ],
            pageInfo: fetchMoreResult.getPosts.pageInfo,
          },
        };
      },
    });
  };

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Posts</h1>

      {edges.map((edge) => (
        <div key={edge.node.id} style={{ marginBottom: "1rem" }}>
          <strong>{edge.node.title}</strong>
        </div>
      ))}

      <button onClick={loadNextPage} disabled={!pageInfo?.hasNextPage}>
        {pageInfo?.hasNextPage ? "Load next page" : "No more posts"}
      </button>
    </div>
  );
};
