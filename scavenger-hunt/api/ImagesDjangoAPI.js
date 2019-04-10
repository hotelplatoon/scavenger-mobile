const fetchImages = () => {
  return fetch(`https://cors-anywhere.herokuapp.com/https://hunt-app-backend.herokuapp.com/api/userhunt/`)
    .then((response) => response.json());
}

const addImage = (imageName) => {
  return fetch('https://cors-anywhere.herokuapp.com/https://hunt-app-backend.herokuapp.com/api/userhunt/', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(imageName)
  })
}

export default {
  addImage: addImage,
  fetchImages: fetchImages
}
