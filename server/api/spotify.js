const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node')
const {User} = require('../db/models')
module.exports = router

router.get('/search', async (req, res, next) => {
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.session.accessToken
  })

  try {
    const {body} = await spotifyApi.searchTracks(req.query.search)

    const searchResults = body.tracks.items.map(track => {
      const smallestAlbumImage = track.album.images.reduce(
        (smallest, image) => {
          if (image.height < smallest.height) return image
          return smallest
        },
        track.album.images[0]
      )

      return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: smallestAlbumImage.url
      }
    })

    res.json(searchResults)
  } catch (err) {
    next(err)
  }
})
