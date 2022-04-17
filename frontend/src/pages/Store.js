import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
// import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from './sections/products';
//

import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

import { AuthContext } from '../utils/context/auth-context';
import { useContext } from 'react';
// utils
// import { mockImgProduct } from '../utils/mockImages';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  {
    name: 'HP Pavillion Gaming Laptop',
    price: '₹39,000'
  },
  {
    name: 'HP Slim Laptop',
    price: '₹29,000'
  },
  {
    name: 'Alienware',
    price: '₹89,000'
  },
  {
    name: 'HP Pavillion Gaming Laptop',
    price: '₹39,000'
  },
  {
    name: 'HP Pavillion Gaming Laptop',
    price: '₹39,000'
  },
  {
    name: 'HP Pavillion Gaming Laptop',
    price: '₹39,000'
  },
  {
    name: 'HP Pavillion Gaming Laptop',
    price: '₹39,000'
  },
  {
    name: 'HP Pavillion Gaming Laptop',
    price: '₹39,000'
  },
  {
    name: 'HP Pavillion Gaming Laptop',
    price: '₹39,000'
  },
  {
    name: 'HP Pavillion Gaming Laptop',
    price: '₹39,000'
  }
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];

// ----------------------------------------------------------------------

const PRODUCTS = [...Array(10)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: setIndex,
    cover: "product_"+setIndex+".jpg",
    name: PRODUCT_NAME[index].name,
    price: PRODUCT_NAME[index].price,
    // priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', ''])
  };
});

// ----------------------------------------------------------------------

export default function Store() {

  const auth = useContext(AuthContext);

  if (!auth.isLoggedIn) {
    window.location.href = "/login";
  }

  const [openFilter, setOpenFilter] = useState(false);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    // <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mt: 3 }}>
          Products
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={1} flexShrink={1} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget />
      </Container>
    // </Page>
  );
}