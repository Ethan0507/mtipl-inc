import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import { styled } from "@mui/material/styles";
import ProductImages from "../components/ProductImages";
import { Typography, Divider, TextField } from "@mui/material";
import { Button } from "@mui/material";

export default function ProductPage() {
    return (
        <>
            <Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12} sm={6}>
                    <ProductImages />
                </Grid> 
                <Grid item xs={12} sm={6} >
                    <Box sx={{ mx: 1 }}>
                        <Typography variant="h3" gutterBottom component="div">Product name</Typography>
                        <Typography variant="subtitle1" gutterBottom component="div">Product description</Typography>
                        <Typography variant="h5" component="div">Rs. 399</Typography>
                        <Button variant="contained" color="secondary" sx={{ my: 2 }}>Buy now</Button>
                        <Button variant="outlined" color="secondary" sx={{ mx: 1, my: 2 }}>Rent now</Button>

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h5" component="div">Product description</Typography>
                        <Typography variant="body" component="div">Product description and other stuff will follow from here</Typography>

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