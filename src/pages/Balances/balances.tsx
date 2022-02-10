import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core'
import HeaderBar from 'components/HeaderBar'
import { format } from 'currency-formatter'
import { useCryptogetApi } from 'hooks/useCryptogetAPI'
import { useSearchParams } from 'hooks/useSearchParam'
import { BalanceTotalsResponse, GetBalanceQueryParams } from 'models/Cryptoget'
import { useCallback, useEffect, useState } from 'react'
import { isEmpty } from 'utils/baseUtils'
import './balances.css'

type BalancesProps = {}

export const Balances: React.FC<BalancesProps> = () => {
  const { parsed } = useSearchParams()
  const { getBalanceFor, isLoading } = useCryptogetApi()
  const [balances, setBalances] = useState<BalanceTotalsResponse>(null)

  const fetchGetBalances = useCallback(
    async (cryptos: GetBalanceQueryParams) => {
      const response = await getBalanceFor(cryptos)

      setBalances(response)
    },
    [getBalanceFor]
  )

  const cryptoBalanceRow = (index: number) => {
    const cryptoSymbol = Object.keys(balances?.currencies)[index]

    return (
      <TableRow key={`${cryptoSymbol}-balance`}>
        <TableCell component="th" scope="row">
          <Typography variant="h6">{cryptoSymbol}</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="h6">
            {format(balances?.currencies[cryptoSymbol].total, { code: 'USD' })}
          </Typography>
        </TableCell>
      </TableRow>
    )
  }

  useEffect(() => {
    if (Object.keys(parsed)[0] && isEmpty(balances)) {
      fetchGetBalances(parsed)
    }
  }, [parsed, balances])

  return (
    <Box className="balances-container">
      <HeaderBar />
      {isLoading ? (
        <Grid container justifyContent="center" className="progress-container">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          <Grid
            container
            direction="column"
            justifyContent="center"
            item
            xs={10}
            sm={7}
            md={6}
            lg={5}
            className="balances-table-container"
          >
            {balances?.currencies && (
              <>
                <Toolbar disableGutters className="balance-table-toolbar">
                  <Grid container justifyContent="space-between">
                    <Typography variant="h4">Total:</Typography>
                    <Typography variant="h4">{format(balances?.total, { code: 'USD' })}</Typography>
                  </Grid>
                </Toolbar>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">Crypto Symbol</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h6">Balance</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(balances?.currencies).map((_, index) => cryptoBalanceRow(index))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
