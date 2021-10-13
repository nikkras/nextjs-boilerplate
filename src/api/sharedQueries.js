export const PRODUCTS_CATEGORIES = `
query queryAllCategory($first: Int!, $prodCategory: String) {
  products(
    where: { status: "publish", category: $prodCategory }
    first: $first
  ) {
    nodes {
      id
      productCategories {
        nodes {
          name
          slug
        }
      }
    }
  }
}
`;

export const CATEGORY_QUERY = `
  query queryCategory($first: Int!, $prodCategory: String) {
    products(
      where: { status: "publish", category: $prodCategory, orderby: { field: MENU_ORDER } }
      first: $first
    ) {
      nodes {
        id
        name
        slug
        image {
          mediaDetails {
            sizes {
              sourceUrl
              name
            }
          }
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const LANDING_QUERY = `
  query queryLanding {
    page(id: "8", idType: DATABASE_ID) {
      landing_fields {
        heroSlider {
          mediaDetails {
            sizes {
              name
              sourceUrl
            }
          }
        }
        collectionsImages {
          mediaDetails {
            sizes {
              name
              sourceUrl
            }
            file
          }
        }
      }
      seo {
        title
        metaDesc
      }
    }
  }
`;

export const PAGE_SEO = `
  query queryPageSEO($pageId: ID!) {
    page(id: $pageId, idType: DATABASE_ID) {
      seo {
        metaDesc
        title
        metaKeywords
      }
    }
  }
`;

export const PAGE_BRAND = `
  query QueryBrandPage {
    page(id: "71", idType: DATABASE_ID) {
      seo {
        metaDesc
        title
      }
      brand_custom_fields {
        finalTextEn
        finalTextIt
        lowerTextEn
        lowerTextIt
        textRippedEn
        textRippedIt
        upperTextEn
        upperTextIt
        upperImages {
          mediaDetails {
            sizes {
              sourceUrl
              name
            }
          }
        }
        lowerImages {
          mediaDetails {
            sizes {
              sourceUrl
              name
            }
          }
        }
      }
    }
  }
`;

export const PAGE_COLLECTIONS = `
  query QueryCollectionsPage {
    page(id: "243", idType: DATABASE_ID) {
      seo {
        metaDesc
        title
      }
      collections_custom_fields {
        images {
          sourceUrl(size: MEDIUM)
          mediaItemUrl
        }
      }
    }
  }
`;

export const PAGE_BUYERS = `
  query QueryBuyersPage {
    page(id: "245", idType: DATABASE_ID) {
      seo {
        metaDesc
        title
      }
      buyers_custom_fields {
        code
        background {
          mediaDetails {
            sizes {
              sourceUrl
              name
            }
          }
        }
      }
    }
  }
`;

export const EVENTS_QUERY = `
  query QueryEvents {
    events {
      nodes {
        title(format: RENDERED)
        id
        featuredImage {
          node {
            mediaDetails {
              sizes {
                name
                sourceUrl
              }
            }
          }
        }
        events_custom_fields {
          text
          date
        }
      }
    }
  }
`;

export const NEWS_QUERY = `
  query queryPosts {
    posts(where: {status: PUBLISH}, first: 100) {
      nodes {
        slug
        featuredImage {
          node {
            sourceUrl(size: MEDIUM)
          }
        }
        id
        title(format: RENDERED)
        date
      }
    }
    page(id: "11", idType: DATABASE_ID) {
      seo {
        metaDesc
        title
      }
    }
  }
`;

export const PROD_SLUGS = `
  query ProductsQuery {
    products(first: 20) {
      nodes {
        slug
      }
    }
  }
`;

export const POSTS_SLUGS = `
  query PostsQuery {
    posts(where: {status: PUBLISH}, first: 20) {
      nodes {
        slug
      }
    }
  }
`;
