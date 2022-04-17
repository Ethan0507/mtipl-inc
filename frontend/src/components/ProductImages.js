import React from "react";
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

let products = [1, 2, 3, 4];

export default function ProductImages({ index }) {
    return (
        <>
        <Stack direction={{ xs: 'column', sm: 'row' }} container spacing={1} sx={{ m: 1 }}>
            <Grid item xs={products.length > 0 ? 2 : 0} >
                <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1} >
                    {products.map((product) => <img src={"products/product_"+index+".jpg"} alt="Product" style={{ maxWidth: "70%", borderRadius: "2%" }} />)}
                </Stack>
            </Grid>
            <Grid item xs={products.length > 0 ? 10 : 12} sx={{ m: 1 }}>
                <img src={"products/product_"+index+".jpg"} alt="Product" style={{ maxWidth: "100%", height: "auto", borderRadius: "2%" }} />
            </Grid>
        </Stack>
        </>
    );
}