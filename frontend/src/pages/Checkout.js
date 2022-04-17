import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useFormik, Form, FormikProvider } from 'formik';
import {useLocation, useNavigate} from 'react-router-dom';
import { AuthContext } from "../utils/context/auth-context";
import { useContext } from 'react';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function Checkout(props) {

  const auth = useContext(AuthContext);

  const [activeStep, setActiveStep] = React.useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state.product;
  const products = [];
  products.push(product);
  

  const formik = useFormik({
    initialValues: getInitialValues(activeStep),
  });

  const handleNext = async () => {
    if (activeStep === 2) {
      
      let reqBody = formik.values;

      reqBody.totalAmount = product.price;
      reqBody.totalDiscount = 0;
      reqBody.productId = product.id;
      reqBody.productName = product.name;
      reqBody.productPrice = product.price;

      console.log(reqBody);

      try {
  
        let response = await fetch('/api/users/'+auth.userId+'/order/new', {
          method: 'POST',
          body: JSON.stringify(reqBody),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        let responseData = await response.json();
        if (!response.ok) {
          throw Error(responseData.message);
        }
        navigate("/order/success", {
          state: {
            orderNo: responseData.order._id,
            orderTotal: product.price
          }
        
        });
      } catch (err) {
        console.log(err);
      }
    }
    else {
      console.log(formik.values);
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm formik={formik}/>;
      case 1:
        return <PaymentForm formik={formik}/>;
      case 2:
        return <Review products={products} formValues={formik.values}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  
  function getInitialValues(step) {
    switch(step) {
      case 0: 
        return {
          firstName: '',
          lastName: '',
          addressInfo: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          cardName: '',
          cardNumber: '',
          expDate: '',
          cvv: ''
        };
      case 1:
          return {
            somevalue: ''
          };
      case 2:
          return {
            newvalue: ''
          }
      default: 
          throw new Error("Unknown step");
    }
  }
  

  return (
      <>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FormikProvider value={formik}>
                <Form>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
                </Form>
                </FormikProvider>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
      </>
  );
}