import React from "react";
import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {

  const [page, setPage] =  React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TablePagination component="div" count={90} page={page} onPageChange={handlePageChange} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} sx={{ mb: 3, flex: 1, justifyContent: "center" }} />
      <Grid container spacing={3} sx={{ mb: 5 }} {...other}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}