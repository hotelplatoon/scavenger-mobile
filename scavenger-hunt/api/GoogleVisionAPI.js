const analyzeImage = async (encodedImage) => {
  console.log(process.env.REACT_APP_GOOGLE_CLOUD_VISION_API_KEY)

  try {
    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: "LABEL_DETECTION", maxResults: 2 },
            { type: "LANDMARK_DETECTION" },
          ],
          image: {
            "content" : encodedImage
          }
        }
      ]
    });
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        "XXXXXXX",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: body
      }
    )
    let responseJson = await response.json();
    console.log(responseJson)
    return responseJson
  } catch (error) {
    console.log(error);
  }
};

export default {
  analyzeImage : analyzeImage,
}