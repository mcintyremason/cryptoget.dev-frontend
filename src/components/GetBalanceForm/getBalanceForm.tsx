import './getBalanceForm.css'

import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import { useState } from 'react'

type GetBalanceFormProps = {}

export const GetBalanceForm: React.FC<GetBalanceFormProps> = ({}) => {
  const [cryptoSymbol, setcryptoSymbol] = useState('ETH')

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
            <Grid container>
              <Grid item xs={6}>
                <Grid container>
                  <FormLabel component="legend" className="text-field-label-container">
                    Crypto Symbol
                  </FormLabel>
                </Grid>
                <Grid container className="text-field-label-container">
                  <Select
                    value={cryptoSymbol}
                    label="Crypto Symbol"
                    // onChange={handleChange}
                  >
                    <MenuItem value="ETH">ETH</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <FormLabel component="legend" className="text-field-label-container">
                    Holdings
                  </FormLabel>
                </Grid>
                <Grid container className="text-field-label-container">
                  <TextField
                    variant="outlined"
                    // value={holdings}
                    // onChange={handleAddressChange}
                    // onKeyUp={handleKeyPress}
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
