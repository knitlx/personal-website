import { redirect } from "next/navigation";

// This page simply redirects to the edit form for a new blog post
export default function NewBlogPage() {
  redirect("/admin/blog/edit/new");
}
