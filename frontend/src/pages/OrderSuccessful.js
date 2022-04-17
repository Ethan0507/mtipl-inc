import { Button, Container, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

export default function OrderSuccessful () {

    const navigate = useNavigate();
    const location = useLocation();

    const { orderNo, orderTotal } = location.state;

    return (
        <>
        <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} sx={{ mx: "auto", my: 5 }} >
            <Typography variant="body">{"Order #" +orderNo}</Typography>
            <Typography variant="h4">{"Successfully paid: ₹"+orderTotal}</Typography>
            <Box sx={{ m: 2 }}>
                <svg style={{ height: "300px", width: "300px"}} xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 475 512.24">
                    <path fill="#C28F60" d="m0 417.58 202.44 26.17c-5.92-16.29-9.15-33.86-9.15-52.19 0-42.22 17.12-80.46 44.79-108.13 27.66-27.66 65.9-44.78 108.12-44.78s80.46 17.12 108.13 44.78a154.91 154.91 0 0 1 16.02 18.85l1.39-261.39L171.87 0 0 77.98v339.6z"/>
                    <path fill="#AA7950" d="m471.74 40.89-11.97 7.8-120.8 75.36L0 77.98 171.87 0z"/>
                    <path fill="#D2A06D" d="M340.21 238.76V126l131.53-85.11L475 309.1c-5.96-9.29-12.9-17.89-20.67-25.67-27.67-27.66-65.91-44.78-108.13-44.78-2 0-4 .04-5.99.11z"/>
                    <path fill="#65472F" d="m232.12 8.21 98.23 13.4-140.6 84.02-.09 145.42-50.03-34.08-50.04 28.28 6.25-152.68z"/>
                    <path fill="#3AAF3C" d="M346.2 270.87c66.66 0 120.69 54.03 120.69 120.69 0 66.65-54.03 120.68-120.69 120.68-66.65 0-120.68-54.03-120.68-120.68 0-66.66 54.03-120.69 120.68-120.69z"/>
                    <path fill="#0DA10D" fill-rule="nonzero" d="M409.98 338.39h9.06c-38.6 42.87-68.52 78.21-95.31 129.89-13.95-29.82-26.39-50.41-54.2-69.5l10.38-2.34c20.79 17 31.74 35.9 43.82 61.73 24.65-47.57 51.97-81.29 86.25-119.78z"/>
                    <path fill="#fff" fill-rule="nonzero" d="M300.02 381.78c9.27 5.34 15.31 9.78 22.49 17.7 18.64-30 38.87-46.62 65.17-70.21l2.57-.99h28.79c-38.6 42.86-68.52 78.21-95.31 129.89-13.95-29.82-26.39-50.41-54.2-69.5l30.49-6.89z"/>
                </svg>
            </Box>
            <Typography variant="h5" sx={{ my: 2 }}>Thank you for shopping with us! Sit back, Relax while we deliver your product.</Typography>
            <Button variant='contained' onClick={() => navigate("/store")}>Shop More</Button>
        </Container>
        </>
    );
}