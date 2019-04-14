

const sendLogin = (loginObject) => {
  return fetch('https://hunt-app-backend.herokuapp.com/api/login/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(loginObject)
  })
}

const addUser = (userObject) => {
  return fetch('https://hunt-app-backend.herokuapp.com/api/signup/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userObject)
  })
}

const getUser = (userObject) => {
  const formattedEmail = userObject.replace('@','%40')
  return fetch(`https://hunt-app-backend.herokuapp.com/api/signup/?search=${formattedEmail}`)
    .then((res) => res.json());
}

export default {
  sendLogin: sendLogin,
  addUser: addUser,
  getUser: getUser
}

// const editCategory = (categoryID, categoryObject) => {
//   return fetch(`http://localhost:8000/categories/${categoryID}/`, {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     method: "PUT",
//     body: JSON.stringify(categoryObject)
//   })
// }

// const deleteCategory = (categoryID) => {
//   return fetch(`http://localhost:8000/categories/${categoryID}/`, { 
//     method: 'DELETE' 
//   });
// }

// const fetchHuntByID = (huntID) => {
//   return fetch(`https://cors-anywhere.herokuapp.com/https://scavenger-backend.herokuapp.com/hunt/${huntID}`)
//     .then((response) => response.json());
// }

// const fetchHuntCheckpoints = (huntID) => {
//   return fetch(`https://cors-anywhere.herokuapp.com/https://scavenger-backend.herokuapp.com/hunt/${huntID}`)
//     .then((response) => response.json());
// }

// const fetchUsers = () => {
//   return fetch(`https://cors-anywhere.herokuapp.com/https://craigslist-django-backend.herokuapp.com/category/`)
//     .then((response) => response.json());
// }


// const addPost = (postObject) => {
//   return fetch('https://cors-anywhere.herokuapp.com/https://craigslist-django-backend.herokuapp.com/posts/', {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     method: 'POST',
//     body: JSON.stringify(postObject)
//   })
// }

// const fetchPosts = () => {
//   return fetch(`https://cors-anywhere.herokuapp.com/https://craigslist-django-backend.herokuapp.com/posts/`)
//     .then((response) => response.json());
// }

// const fetchPostsByCategory = (categoryID) => {
//   return fetch(`https://cors-anywhere.herokuapp.com/https://craigslist-django-backend.herokuapp.com/posts/?filter={"where":{"categoryID":"${categoryID}"}}`)
//     .then((data) => data.json())
// }