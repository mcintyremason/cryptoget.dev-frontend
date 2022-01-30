import './dashboard.css'

import React from 'react'
import { Grid } from '@material-ui/core'

import HeaderBar from 'components/HeaderBar'
import { useCryptogetApi } from 'hooks/useCryptogetAPI'
import GetBalanceForm from 'components/GetBalanceForm'

export const Dashboard: React.FC = _ => {
  const { getBalanceFor } = useCryptogetApi()

  return (
    <>
      <HeaderBar />
      <Grid container justifyContent="space-between" className="dashboard">
        <GetBalanceForm />
      </Grid>
    </>
  )
}
