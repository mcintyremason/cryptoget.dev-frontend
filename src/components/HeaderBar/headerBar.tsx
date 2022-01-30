import './headerBar.css'

import React from 'react'
import { AppBar, Grid, Typography } from '@material-ui/core'

export const HeaderBar: React.FC = _ => {
  return (
    <AppBar position="static" color="transparent" className="header-bar">
      <Grid container justifyContent="space-between">
        <Grid container item xs={12}>
          <Grid container justifyContent="center" item xs={3}>
            <Typography variant="h4">CryptoGet</Typography>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  )
}
