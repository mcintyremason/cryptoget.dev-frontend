import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  NativeSelect,
  TextField,
  Typography,
} from '@material-ui/core'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined'
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined'
import { Cryptos } from 'models/Cryptoget'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { isEmpty } from 'utils/baseUtils'
import { modifyHistory } from 'utils/historyUtils'
import './holdingsForm.css'

type HoldingsFormProps = {
  cryptos: Cryptos
}

type CryptoEntry = {
  symbol: string
  holdings: number
}

const DEFAULT_CRYPTO_ENTRY = {
  symbol: 'default',
  holdings: 0,
}

export const HoldingsForm: React.FC<HoldingsFormProps> = ({ cryptos }) => {
  const history = useHistory()
  const [cryptoEntries, setCryptoEntries] = useState<Array<CryptoEntry>>([DEFAULT_CRYPTO_ENTRY])

  const handleCryptoOnChange = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
    if (event.target.value) {
      const updatedEntries = cryptoEntries.map((entry, i) => {
        if (i === index) {
          return {
            symbol: event.target.value,
            holdings: cryptoEntries[index].holdings,
          }
        }
        return entry
      })

      setCryptoEntries(updatedEntries)
    }
  }

  const handleHoldingsOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedEntries = cryptoEntries.map((entry, i) => {
      if (i === index) {
        return {
          symbol: cryptoEntries[index].symbol,
          holdings: parseFloat(event.target.value),
        }
      }
      return entry
    })

    setCryptoEntries(updatedEntries)
  }

  const handleOnSubmit = () => {
    const cryptoBalancesRequest = cryptoEntries
      .map(entry => {
        return {
          [entry.symbol]: entry.holdings.toString(),
        }
      })
      .reduce((acc, curr) => ({
        ...acc,
        ...curr,
      }))

    localStorage.setItem('cryptoEntries', JSON.stringify(cryptoEntries))
    modifyHistory(
      history,
      {
        previousRequest: cryptoBalancesRequest,
      },
      cryptoBalancesRequest,
      false,
      '/balances'
    )
  }

  const handleAddCryptoOnClick = () => {
    setCryptoEntries([...cryptoEntries, DEFAULT_CRYPTO_ENTRY])
  }

  const handleRemoveCryptoOnClick = () => {
    const updatedCryptoEntries = [...cryptoEntries]

    if (cryptoEntries.length > 1) {
      updatedCryptoEntries.pop()
    } else {
      updatedCryptoEntries.pop()
      updatedCryptoEntries.push(DEFAULT_CRYPTO_ENTRY)
    }

    setCryptoEntries(updatedCryptoEntries)
  }

  useEffect(() => {
    const localStorageCryptoEntries = JSON.parse(localStorage.getItem('cryptoEntries'))
    if (localStorageCryptoEntries && !isEmpty(cryptos)) {
      setCryptoEntries(localStorageCryptoEntries)
    }
  }, [cryptos])

  const cryptoOptions = cryptos?.map(crypto => (
    <option value={crypto.symbol} key={crypto.symbol}>
      {crypto.fullName}
    </option>
  ))

  const cryptoEntry = (index: number) => (
    <Grid container justifyContent="space-between" key={`crypto-entry-${index}`}>
      <Grid item xs={6} md={5}>
        {index === 0 && (
          <Grid container>
            <FormLabel component="legend" className="text-field-label-container">
              Crypto Symbol
            </FormLabel>
          </Grid>
        )}
        <Grid container className="text-field-label-container">
          <NativeSelect
            value={cryptoEntries[index].symbol}
            onChange={e => handleCryptoOnChange(e, index)}
          >
            <option value="default" disabled>
              Select Crypto
            </option>
            {cryptoOptions}
          </NativeSelect>
        </Grid>
      </Grid>
      <Grid item xs={5} md={5}>
        <Grid container>
          {index === 0 && (
            <FormLabel component="legend" className="text-field-label-container">
              Holdings
            </FormLabel>
          )}
        </Grid>
        <Grid container className="text-field-label-container">
          <TextField
            type="number"
            inputProps={{
              min: '0',
              step: '0.000001',
            }}
            variant="outlined"
            value={cryptoEntries[index].holdings}
            onChange={e => handleHoldingsOnChange(e, index)}
            color="primary"
            className="text-field"
          />
        </Grid>
      </Grid>
    </Grid>
  )

  return (
    <Card elevation={5} className="holdings-form-container">
      <CardContent className="card-content">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              Welcome!
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h5" align="center">
              We're a one stop shop to help find the total value of all of your holdings
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions className="card-actions">
        <Grid container justifyContent="center">
          <FormGroup>
            {cryptoEntries.map((_, i) => cryptoEntry(i))}
            <Grid container justifyContent="flex-start" className="add-icon-container">
              <IconButton
                color="primary"
                aria-label="add crypto entry"
                component="span"
                onClick={handleAddCryptoOnClick}
                className="add-icon"
              >
                <AddCircleOutlinedIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="add crypto entry"
                component="span"
                onClick={handleRemoveCryptoOnClick}
                className="remove-icon"
              >
                <RemoveCircleOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid container justifyContent="center" className="submit-container">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOnSubmit()}
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
