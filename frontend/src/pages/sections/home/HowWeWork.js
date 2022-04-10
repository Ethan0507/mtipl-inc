import { Container, Stack, Typography, Box, Button, Divider, Paper } from "@mui/material";
import React from "react";
import HandymanIcon from '@mui/icons-material/Handyman';
import HandshakeIcon from '@mui/icons-material/Handshake';
import WarningIcon from '@mui/icons-material/Warning';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

export default function HowWeWork() {
    return (
        <Container id="how-we-work" sx={{ my: 5 }}>
            <Typography variant="h4" color="primary">
                How We Work
            </Typography>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
            >
                <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Paper sx={{ width: "3rem", height: "3rem", color: "grey" }}>
                        <WarningIcon fontSize="large" sx={{ p: 1 }} />
                    </Paper>
                    <Typography variant="h7" color="primary">
                        Device is damaged?
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Paper sx={{ width: "3rem", height: "3rem", color: "grey" }}>
                        <HandshakeIcon fontSize="large" sx={{ p: 1 }} />
                    </Paper>
                    <Typography variant="h7" color="primary">
                        Hand it over
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Paper sx={{ width: "3rem", height: "3rem", color: "grey" }}>
                        <HandymanIcon fontSize="large" sx={{ p: 1 }} />
                    </Paper>
                    <Typography variant="h7" color="primary">
                        Quick resolution
                    </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Paper sx={{ width: "3rem", height: "3rem", color: "grey" }}>
                        <DeliveryDiningIcon fontSize="large" sx={{ p: 1 }} />
                    </Paper>
                    <Typography variant="h7" color="primary">
                        Prompt delivery
                    </Typography>
                </Box>
            </Stack>
        </Container>
    );
}