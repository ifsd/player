import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: 100
  }
}))

export default function SearchResult({track}) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={track.albumUrl}
        title={track.title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="body1">{track.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {track.artist}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}
