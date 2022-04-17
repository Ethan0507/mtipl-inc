import { Container, Stack, Typography, Box, Button, Divider, Paper, Link } from "@mui/material";
import React from "react";

export default function Contact() {
    return (
        <Container id="how-we-work" sx={{ my: 5 }}>
            <Typography variant="h4" color="primary">
                Contact us
            </Typography>
            <Button onClick={() => window.location = 'mailto:info@mtipl.com'}>info@mtipl.com</Button>
        </Container>
    );
}