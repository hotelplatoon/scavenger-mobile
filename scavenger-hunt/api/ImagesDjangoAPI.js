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
  addImage: addImage,
  fetchImages: fetchImages,
  fetchHuntThemes: fetchHuntThemes
}
