export interface Blog {
  id: number;
  title: string;
  body: string;
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=8");

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs. Status: ${response.status}`);
    }

    const blogs: Blog[] = await response.json();
    return blogs;
  } catch (error) {
    console.error("Blog fetch error:", error);
    return [];
  }
}