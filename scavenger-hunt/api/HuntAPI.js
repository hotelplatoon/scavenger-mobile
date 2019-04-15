const fetchHuntByID = () => {
  return fetch(`https://hunt-app-backend.herokuapp.com/api/hunt`)
    .then((response) => response.json());
}

const fetchCheckpointsbyID = () => {
  return fetch(`https://hunt-app-backend.herokuapp.com/api/checkpoint`)
    .then((response) => response.json());
}

const fetchUsersbyID = (userID) => {
  return fetch(`https://hunt-app-backend.herokuapp.com/api/signup`)
    .then((response) => response.json());
}

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

const fetchImages = () => {
  return fetch(`https://hunt-app-backend.herokuapp.com/api/userimages/`)
    .then((response) => response.json());
}

const addImage = (imageObject) => {
  return fetch('https://hunt-app-backend.herokuapp.com/api/userimages/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(imageObject)
  })
}

const fetchHuntThemes = () => {
  return fetch(`https://hunt-app-backend.herokuapp.com/api/hunt/`)
    .then((response) => response.json());
}

export default {
  fetchHuntByID: fetchHuntByID,
  fetchCheckpointsbyID: fetchCheckpointsbyID,
  fetchUsersbyID: fetchUsersbyID,
  sendLogin: sendLogin,
  addUser: addUser,
  getUser: getUser,
  addImage: addImage,
  fetchImages: fetchImages,
  fetchHuntThemes: fetchHuntThemes,
}
