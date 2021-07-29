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
      console.log(track.album.images)
      return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: track.album.images[1].url
      }
    })

    res.json(searchResults)
  } catch (err) {
    next(err)
  }
})
