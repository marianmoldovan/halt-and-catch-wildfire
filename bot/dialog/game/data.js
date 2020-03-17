const fs = require('fs')
const path = require('path')

const setS3ImageUrl = (asset) => {
  // Uploaded the file to s3 through the console and I usually use code for it, and always encode the filename...
  // So basically, AWS and I both encoded the filename
  const imageID = encodeURIComponent(encodeURIComponent(asset.id))
  const imageUrl = `https://halt-and-catch-wildfire-assets.s3-eu-west-1.amazonaws.com/images/${imageID}.png`
  asset.image = imageUrl
  return asset
}

const getImages = () => {
  const rawFile = fs.readFileSync(path.join(__dirname, 'data.json'))
  const images = JSON.parse(rawFile)
  return images.map(setS3ImageUrl)
}

module.exports = {
  getImages
}