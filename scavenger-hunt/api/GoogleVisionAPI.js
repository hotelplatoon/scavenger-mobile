import { Constants } from 'expo';

const analyzeImage = async (encodedImage) => {
  try {
    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: "LABEL_DETECTION", maxResults: 10 },
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
      Constants.manifest.extra.GOOGLE_CLOUD_VISION_API_KEY,
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
    return responseJson
  } catch (error) {
    console.log(error);
  }
};

export default {
  analyzeImage : analyzeImage,
}