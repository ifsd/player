const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')
} else {
  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL,
    passReqToCallback: true
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (req, accessToken, refreshToken, expires_in, profile, done) => {
      const spotifyId = profile.id
      const email = profile.emails[0].value
      const imgUrl = profile.photos[0]?.value
      const username = profile.username
      const displayName = profile?.displayName

      User.findOrCreate({
        where: {spotifyId},
        defaults: {email, imgUrl, username, displayName}
      })
        .then(([user]) => {
          req.session.accessToken = accessToken
          req.session.refreshToken = refreshToken
          req.session.accessTokenExpirationDate = new Date(
            Date.now() + expires_in * 1000
          )
          return done(null, user)
        })
        .catch(done)
    }
  )

  passport.use(strategy)

  const scope = [
    'user-read-private',
    'user-read-email',
    'streaming',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state'
  ]

  router.get('/', passport.authenticate('spotify', {scope}))

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
