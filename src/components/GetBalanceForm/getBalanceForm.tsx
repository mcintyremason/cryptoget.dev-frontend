import "./getBalanceForm.css";

import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

type GetBalanceFormProps = {};

export const GetBalanceForm: React.FC<GetBalanceFormProps> = ({}) => {
  return (
    <Card elevation={5} className="get-balance-card">
      <CardContent className="card-content">
        <Typography variant="h5" align="center">
          Welcome! We're a one stop shop to help find the total value of all of
          your holdings
        </Typography>
      </CardContent>
      <Divider />
      <CardActions className="card-actions">
        <Grid container justifyContent="center">
          <FormGroup>
            <Grid container>
              <FormLabel
                component="legend"
                className="text-field-label-container"
              >
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
            <Grid container className="submit-container">
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
  );
};
