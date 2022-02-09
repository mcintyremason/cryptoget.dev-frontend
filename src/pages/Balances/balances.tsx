import { Box, CircularProgress, Divider, Grid, Typography } from '@material-ui/core'
import HeaderBar from 'components/HeaderBar'
import { format } from 'currency-formatter'
import { useCryptogetApi } from 'hooks/useCryptogetAPI'
import { useSearchParams } from 'hooks/useSearchParam'
import { BalanceTotalsResponse, GetBalanceQueryParams } from 'models/Cryptoget'
import { useEffect, useState } from 'react'
import { isEmpty } from 'utils/baseUtils'
import './balances.css'

type BalancesProps = {}

export const Balances: React.FC<BalancesProps> = () => {
  const { parsed } = useSearchParams()
  const { getBalanceFor, isLoading } = useCryptogetApi()
  const [balances, setBalances] = useState<BalanceTotalsResponse>(null)

  const fetchGetBalances = async (cryptos: GetBalanceQueryParams) => {
    const response = await getBalanceFor(cryptos)

    setBalances(response)
  }

  const cryptoBalanceEntry = (index: number) => {
    const cryptoSymbol = Object.keys(balances?.currencies)[index]

    return (
      <Grid container justifyContent="center" key={`${cryptoSymbol}-balance`}>
        <Grid item xs={3}>
          <Typography variant="h2">{cryptoSymbol}:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h2">
            {format(balances?.currencies[cryptoSymbol].total, { code: 'USD' })}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  useEffect(() => {
    if (Object.keys(parsed)[0] && isEmpty(balances)) {
      fetchGetBalances(parsed)
    }
  }, [parsed])

  return (
    <Box>
      <HeaderBar />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container justifyContent="center" item xs={11}>
          {balances?.currencies &&
            Object.keys(balances?.currencies).map((_, index) => cryptoBalanceEntry(index))}
          <Divider variant="middle" />
          <Grid container justifyContent="center">
            <Grid item xs={3}>
              <Typography variant="h2">Total: </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h2">{format(balances?.total, { code: 'USD' })}</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
