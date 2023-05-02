const AUTH_USER = `
  query authUser($email: String, $password: String) {
    authUser(email: $email, password: $password) {
      _id
      name
      email
      role
      token
    }
  }
`

const GET_CATEGORIES = `
  query getCategories($limit: Int, $skip: Int, $keyword: String) {
    getCategories(limit: $limit, skip: $skip, keyword: $keyword) {
        categories {
          _id
          name
          createdAt
        }
        total
    }
  }
`

const GET_WALLPAPERS = `
  query getWallpapers($limit: Int, $skip: Int, $keyword: String, $categoryId: String) {
    getWallpapers(limit: $limit, skip: $skip, keyword: $keyword, categoryId: $categoryId) {
        wallpapers {
            _id
            name
            image
            likes
            downloads
            categoryId {
              _id
              name
            }
            isFeatured
            createdAt
        }
        total
    }
  }
`

const GET_USERS = `
  query getUsers($limit: Int, $skip: Int) {
    getUsers(limit: $limit, skip: $skip) {
        users {
          _id
          createdAt
          favourites
          likes
          downloads
        }
        total
    }
  }
`

module.exports = {
  AUTH_USER,
  GET_CATEGORIES,
  GET_WALLPAPERS,
  GET_USERS
}
