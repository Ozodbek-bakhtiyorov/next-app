import { request, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredimage {
              url
            }
            categories {
              name
              id
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getCategoryPosts = async (slug) => {
  const query = gql`
    query Myquery($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredimage {
              url
            }
            categories {
              name
              id
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query getPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        createdAt
        slug
        title
        excerpt
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        featuredimage {
          url
        }
        categories {
          id
          slug
        }
        content {
          raw
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query MyQuery {
      posts(last: 3, orderBy: createdAt_ASC) {
        createdAt
        slug
        title
        featuredimage {
          url
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};

export async function getSimilarPosts(categories, slug) {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredimage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { categories, slug });
  return result.posts;
}

export async function getCategories() {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories;
}

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query MyQuery($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        comment
        createdAt
        name
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
};

export const getFeaturedPosts = async (slug) => {
  const query = gql`
    query MyQuery {
      posts(where: { featuredpost: true }) {
        author {
          name
          photo {
            url
          }
        }
        featuredimage {
          url
        }
        createdAt
        slug
        title
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;
};
