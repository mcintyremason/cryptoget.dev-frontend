import { AppBar, Grid, Typography } from '@material-ui/core'
import React from 'react'
import './headerBar.css'

export const HeaderBar: React.FC = _ => {
  return (
    <AppBar position="static" color="transparent" className="header-bar">
      <Grid container justifyContent="center">
        <Typography variant="h4">CryptoGet</Typography>
      </Grid>
    </AppBar>
  )
}
