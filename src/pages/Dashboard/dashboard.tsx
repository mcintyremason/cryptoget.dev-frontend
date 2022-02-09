import { Box, CircularProgress, Grid } from '@material-ui/core'
import HeaderBar from 'components/HeaderBar'
import GetBalanceForm from 'components/HoldingsForm'
import { useCryptogetApi } from 'hooks/useCryptogetAPI'
import { Cryptos } from 'models/Cryptoget'
import React, { useEffect, useState } from 'react'
import './dashboard.css'

export const Dashboard: React.FC = _ => {
  const { getCryptoList, isLoading } = useCryptogetApi()
  const [cryptos, setCryptos] = useState<Cryptos>([])

  const fetchCryptoList = async () => {
    const cryptoList = await getCryptoList()
    setCryptos(cryptoList)
  }

  useEffect(() => {
    fetchCryptoList()
  }, [])

  return (
    <Box>
      <HeaderBar />
      <Grid container justifyContent="space-between" className="dashboard">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container justifyContent="center">
            <GetBalanceForm cryptos={cryptos} />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
