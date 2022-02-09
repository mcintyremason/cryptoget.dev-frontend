import { Box, CircularProgress, Divider, Grid, Typography } from '@material-ui/core'
import HeaderBar from 'components/HeaderBar'
import { useCryptogetApi } from 'hooks/useCryptogetAPI'
import { useSearchParams } from 'hooks/useSearchParam'
import { BalanceTotalsResponse } from 'models/Cryptoget'
import { useEffect, useState } from 'react'
import './balances.css'

type BalancesProps = {}

export const Balances: React.FC<BalancesProps> = () => {
  const { parsed } = useSearchParams()
  const { getBalanceFor, isLoading } = useCryptogetApi()
  const [balances, setBalances] = useState<BalanceTotalsResponse>(null)

  const fetchGetBalances = async (cryptoSymbol: string, holdings: number) => {
    const response = await getBalanceFor({
      [cryptoSymbol]: holdings,
    })

    setBalances(response)
  }

  useEffect(() => {
    if (Object.keys(parsed)[0]) {
      fetchGetBalances(Object.keys(parsed)[0], parseFloat(Object.values(parsed)[0] as string))
    }
  }, [parsed])

  return (
    <Box>
      <HeaderBar />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container justifyContent="center" item xs={11}>
          <Grid container justifyContent="center">
            <Grid item xs={3}>
              <Typography variant="h2">
                {balances?.currencies[Object.keys(parsed)[0]].symbol}:
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h2">
                {balances?.currencies[Object.keys(parsed)[0]].total}
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid container justifyContent="center">
            <Grid item xs={3}>
              <Typography variant="h2">Total: </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h2">{balances?.total}</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
