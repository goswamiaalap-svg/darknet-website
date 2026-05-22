import BlogList from "@/components/sections/BlogList";
import { getAllBlogs } from "@/lib/getData";

export default async function BlogPage() {
  // Fetch data on the server instantly
  const posts = await getAllBlogs();
  
  return <BlogList initialPosts={posts || []} />;
}
