import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormikProvider } from 'formik';

export default function PaymentForm({ formik }) {

  const { values, setFieldValue } = formik;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <FormikProvider value={formik}>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              name="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              value={values.cardName}
              onChange={(e) => setFieldValue('cardName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              value={values.cardNumber}
              onChange={(e) => setFieldValue('cardNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              name="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              value={values.expDate}
              onChange={(e) => setFieldValue('expDate', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              type="password"
              id="cvv"
              name="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              value={values.cvv}
              onChange={(e) => setFieldValue('cvv', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>
      </FormikProvider>
    </>
  );
}