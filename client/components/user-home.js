import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Search} from './'
import {Typography} from '@material-ui/core'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <Search />
    // <Player />
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
