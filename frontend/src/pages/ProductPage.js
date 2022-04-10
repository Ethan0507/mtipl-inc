import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import Paper from '@mui/material/Paper';
// import { styled } from "@mui/material/styles";
import ProductImages from "../components/ProductImages";
import { Typography, Divider, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const PRODUCT_NAME = [
    {
      name: 'HP Pavillion Gaming Laptop',
      price: 39000,
      description: "Laptop for Gaming"
    },
    {
      name: 'HP Slim Laptop',
      price: 29000,
      description: "Laptop for Gaming"
    },
    {
      name: 'Alienware',
      price: 89000,
      description: "Laptop for Gaming"
    },
    {
      name: 'HP Pavillion Gaming Laptop',
      price: 39000,
      description: "Laptop for Gaming"
    },
    {
      name: 'HP Pavillion Gaming Laptop',
      price: 39000,
      description: "Laptop for Gaming"
    },
    {
      name: 'HP Pavillion Gaming Laptop',
      price: 39000,
      description: "Laptop for Gaming"
    },
    {
      name: 'HP Pavillion Gaming Laptop',
      price: 39000,
      description: "Laptop for Gaming"
    },
    {
      name: 'HP Pavillion Gaming Laptop',
      price: 39000,
      description: "Laptop for Gaming"
    },
    {
      name: 'HP Pavillion Gaming Laptop',
      price: 39000,
      description: "Laptop for Gaming"
    },
    {
      name: 'HP Pavillion Gaming Laptop',
      price: 39000,
      description: "Laptop for Gaming"
    }
  ];


export default function ProductPage(props) {

    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('id');
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state);

    const product = {
        name: PRODUCT_NAME[index - 1].name,
        price: PRODUCT_NAME[index - 1].price,
        description: PRODUCT_NAME[index - 1].description,
        cover: "product_"+index+".jpg",
        id: index
    };

    const addProductToCart = () => {
        navigate("/checkout", {
            state: {
                product: product
            }
        });
    };

    return (
        <>
            <Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12} sm={6}>
                    <ProductImages index={index}/>
                </Grid> 
                <Grid item xs={12} sm={6} >
                    <Box sx={{ mx: 1 }}>
                        <Typography variant="h3" gutterBottom component="div">{product.name}</Typography>
                        <Typography variant="h5" component="div">{'₹ ' +product.price}</Typography>
                        <Button variant="contained" color="secondary" sx={{ my: 2 }} onClick={addProductToCart}>Buy now</Button>
                        <Button variant="outlined" color="secondary" sx={{ mx: 1, my: 2 }} onClick={addProductToCart}>Rent now</Button>

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h5" component="div">Product description</Typography>
                        <Typography variant="body" component="div">{product.description}</Typography>

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h5" component="div">Delivery options</Typography>
                        <TextField
                            id="outlined-pincode-input"
                            label="Pin code"
                            type="number"
                            sx={{ my: 1 }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};