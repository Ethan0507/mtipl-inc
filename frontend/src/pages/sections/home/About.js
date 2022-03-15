import { Container, Stack, Typography, Box, Button, Divider } from "@mui/material";
import React from "react";

export default function About() {
    return (
        <Container id="about" sx={{ my: 5 }}>
            <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-644351,resizemode-1,msid-72728007/tech/ites/tech-services-firms-look-to-turn-a-page-with-content-moderation.jpg" alt="MTIPL"  style={{ maxWidth: "50vw", borderRadius: "15px" }}/>
                <Box>
                    <Typography variant="h4" color="primary">
                    MTIPL Inc is an IT solutions provider
                    </Typography>
                    <Typography variant="body" color="black">
                    MTIPL Inc is an IT solutions & service provider serving organizations since 1990. We provide technology-driven business solutions that meet the objective of our valued customers. We are primarily focused on providing a professional and personalized services to businesses. Centrally located at Andheri the heart of Mumbai city, we are 2 minutes away from the Azad Nagar Metro station giving us a distinct advantage for reduced travel time for the staff.
                    </Typography>
                    <Box sx={{ m: 1 }}>
                        <Button color="secondary">Read more</Button>
                    </Box>
                </Box>
            </Stack>
        </Container>
    );
}