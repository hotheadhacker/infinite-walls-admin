/* Add category */
const ADD_CATEGORY = `
  mutation addCategory($name: String) {
    addCategory(name: $name) {
      _id
      name
      createdAt
    }
  }
`

/* Edit category */
const EDIT_CATEGORY = `
  mutation editCategory($categoryId: ID, $name: String) {
    editCategory(categoryId: $categoryId, name: $name) {
      _id
      name
      createdAt
    }
  }
`

/* Delete category */
const DELETE_CATEGORY = `
  mutation deleteCategory($categoryId: ID) {
    deleteCategory(categoryId: $categoryId) 
  }
`

/* Add wallpaper */
const ADD_WALLPAPER = `
  mutation addWallpaper($name: String, $image: String, $categoryId: ID, $isFeatured:  Boolean) {
    addWallpaper(name: $name, image: $image, categoryId: $categoryId, isFeatured: $isFeatured) {
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
  }
`

/* Edit wallpaper */
const EDIT_WALLPAPER = `
  mutation editWallpaper($wallpaperId: ID, $name: String, $image: String, $categoryId: ID, $isFeatured: Boolean) {
    editWallpaper(wallpaperId: $wallpaperId, name: $name, image: $image, categoryId: $categoryId, isFeatured: $isFeatured) {
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
  }
`

/* Delete wallpaper */
const DELETE_WALLPAPER = `
  mutation deleteWallpaper($wallpaperId: ID) {
    deleteWallpaper(wallpaperId: $wallpaperId) 
  }
`

module.exports = {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  ADD_WALLPAPER,
  EDIT_WALLPAPER,
  DELETE_WALLPAPER 
}
