export const searchUsers = `
  query search($queryString: String!) {
    search(query: $queryString, type:USER, first: 10) {
      userCount
      edges {
        node {
          ... on User {
            login,
            name,
            location,
            email,
            company,
            avatarUrl
          }
        }
      }
    }
  }
`
