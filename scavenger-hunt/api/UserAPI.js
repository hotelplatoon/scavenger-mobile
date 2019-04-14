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
