import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import {SearchResult} from './'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}))

function Search() {
  const classes = useStyles()

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(
    () => {
      if (!search) return setSearchResults([])

      let cancel = false
      const fetchTracks = async () => {
        const {data} = await axios.get('/api/spotify/search', {
          params: {
            search
          }
        })
        if (cancel) return
        setSearchResults(data)
      }
      fetchTracks()
      return () => (cancel = true)
    },
    [search]
  )

  return (
    <div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item>
            <TextField
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="input-with-icon-grid"
              label="Artists or songs"
            />
          </Grid>
        </Grid>
        {searchResults.map(track => (
          <SearchResult track={track} key={track.uri} />
        ))}
      </div>
    </div>
  )
}

export default Search
