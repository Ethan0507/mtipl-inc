import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormikProvider } from 'formik';

const AddressForm = ({ formik }) => {

  const { values, setFieldValue } = formik;


  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormikProvider value={formik}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={values.firstName}
                onChange={(e) => setFieldValue('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                value={values.lastName}
                onChange={(e) => setFieldValue('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="addressInfo"
                label="Address info"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                value={values.addressInfo}
                onChange={(e) => setFieldValue('addressInfo', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                value={values.city}
                onChange={(e) => setFieldValue('city', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                variant="standard"
                value={values.state}
                onChange={(e) => setFieldValue('state', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="postalCode"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
                value={values.postalCode}
                onChange={(e) => setFieldValue('postalCode', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
                value={values.country}
                onChange={(e) => setFieldValue('country', e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Use this address for payment details"
              />
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" value="yes" />}
                label="Save this as primary address"
              />
            </Grid>
          </Grid>
      </FormikProvider>
    </>
  );
}

export default AddressForm;