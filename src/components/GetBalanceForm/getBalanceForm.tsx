import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormGroup,
  FormLabel,
  Grid,
  NativeSelect,
  TextField,
  Typography,
} from '@material-ui/core'
import { useCryptogetApi } from 'hooks/useCryptogetAPI'
import { Cryptos } from 'models/Cryptoget'
import React, { ChangeEvent, useState } from 'react'
import './getBalanceForm.css'

type GetBalanceFormProps = {
  cryptos: Cryptos
  fetchGetBalances: (cryptoSymbol: string, holdings: number) => Promise<void>
}

export const GetBalanceForm: React.FC<GetBalanceFormProps> = ({ cryptos, fetchGetBalances }) => {
  const { getBalanceFor } = useCryptogetApi()
  const [cryptoSymbol, setCryptoSymbol] = useState('default')
  const [holdings, setHoldings] = useState<number>(0)

  const cryptoOptions = cryptos.map(crypto => (
    <option value={crypto.symbol} key={crypto.symbol}>
      {crypto.fullName}
    </option>
  ))

  const handleCryptoOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCryptoSymbol(event.target.value)
  }

  const handleHoldingsOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setHoldings(parseFloat(event.target.value))
    }
  }

  return (
    <Card elevation={5} className="get-balance-card">
      <CardContent className="card-content">
        <Typography variant="h5" align="center">
          Welcome! We're a one stop shop to help find the total value of all of your holdings
        </Typography>
      </CardContent>
      <Divider />
      <CardActions className="card-actions">
        <Grid container justifyContent="center">
          <FormGroup>
            <Grid container justifyContent="space-between">
              <Grid item xs={5}>
                <Grid container>
                  <FormLabel component="legend" className="text-field-label-container">
                    Crypto Symbol
                  </FormLabel>
                </Grid>
                <Grid container className="text-field-label-container">
                  <NativeSelect defaultValue={cryptoSymbol} onChange={handleCryptoOnChange}>
                    <option value="default" disabled>
                      Select Crypto
                    </option>
                    {cryptoOptions}
                  </NativeSelect>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <FormLabel component="legend" className="text-field-label-container">
                    Holdings
                  </FormLabel>
                </Grid>
                <Grid container className="text-field-label-container">
                  <TextField
                    type="number"
                    inputProps={{
                      min: '0',
                      step: '0.000001',
                    }}
                    variant="outlined"
                    value={holdings}
                    onChange={handleHoldingsOnChange}
                    color="primary"
                    className="text-field"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" className="submit-container">
              <Button
                variant="contained"
                color="primary"
                // onClick={handleGetBalances}
                onClick={() => fetchGetBalances(cryptoSymbol, holdings)}
                className="card-button"
              >
                Sumbit
              </Button>
            </Grid>
          </FormGroup>
        </Grid>
      </CardActions>
    </Card>
  )
}
