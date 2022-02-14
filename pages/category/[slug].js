import React from "react";
import { getCategories, getCategoryPosts } from "../../services";
import { Categories , Loader} from "../components";
import PostCard from "./../components/PostCard";
import {useRouter} from "next/router";
export default function Category({ posts }) {
  const router = useRouter();
  if(router.isFallback){
    return <Loader/>
  }
  return (
    <div className="container relative mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
        <div className=" col-sapan-1 lg:col-span-8">
          {posts.map((post, index) => {
            return <PostCard key={index} post={post.node} />;
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const posts = await getCategoryPosts(params.slug);
  return { props: { posts } };
}
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
