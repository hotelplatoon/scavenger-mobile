const fetchHuntByID = () => {
  return fetch(`https://scavenger-backend.herokuapp.com/api/hunt`)
    .then((response) => response.json());
}

const fetchCheckpointsbyID = () => {
  return fetch(`https://hunt-app-backend.herokuapp.com/api/checkpoint`)
    .then((response) => response.json());
}
 
const fetchUsersbyID = (userID) => {
  return fetch(`https://scavenger-backend.herokuapp.com/api/signup`)
    .then((response) => response.json());
}

export default {
  fetchHuntByID: fetchHuntByID,
  fetchCheckpointsbyID: fetchCheckpointsbyID,
  fetchUsersbyID: fetchUsersbyID,
}


// const addCategory = (categoryObject) => {
//   return fetch('https://cors-anywhere.herokuapp.com/https://craigslist-django-backend.herokuapp.com/category/', {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     method: 'POST',
//     body: JSON.stringify(categoryObject)
//   })
// }

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


