import { Box, CircularProgress, Grid } from '@material-ui/core'
import HeaderBar from 'components/HeaderBar'
import GetBalanceForm from 'components/HoldingsForm'
import { useCryptogetApi } from 'hooks/useCryptogetAPI'
import { Cryptos } from 'models/Cryptoget'
import React, { useCallback, useEffect, useState } from 'react'
import './home.css'

export const Home: React.FC = _ => {
  const { getCryptoList, isLoading } = useCryptogetApi()
  const [cryptos, setCryptos] = useState<Cryptos>([])

  const fetchCryptoList = useCallback(async () => {
    const cryptoList = await getCryptoList()
    setCryptos(cryptoList)
  }, [getCryptoList])

  useEffect(() => {
    fetchCryptoList()
  }, [])

  return (
    <Box>
      <HeaderBar />
      <Grid container justifyContent="space-between" className="dashboard">
        {isLoading ? (
          <Grid container justifyContent="center" className="progress-container">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container justifyContent="center">
            <GetBalanceForm cryptos={cryptos} />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
