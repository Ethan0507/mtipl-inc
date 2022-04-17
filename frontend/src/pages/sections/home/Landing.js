import React from "react";
import Carousel from 'react-material-ui-carousel'

import { Paper, Button, Box, Typography, Container } from "@mui/material";

export default function Landing(props)
{
    var items = [
        {
            name: "Laptops",
            image: "https://images.pexels.com/photos/705675/pexels-photo-705675.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        },
        {
            name: "Networking",
            image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        },
        {
            name: "Firewall installation",
            image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        },
        {
            name: "Data Leak Protection",
            image: "https://images.pexels.com/photos/211151/pexels-photo-211151.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        },
        {
            name: "Secure Tunelling",
            image: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        }
    ]

    return (
        <Carousel autoPlay animation="slide" duration={1000} indicators={false}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Container>
            <img src={props.item.image} alt={props.item.name}/>
            <Box style={{ p: 1, position: "absolute", top: "5%", left: "2%", zIndex:10000, border: "2px solid white", backgroundColor:"rgba(0,0,30,0.4)", backdropFilter: "blur(2px)" }}>
                <Typography variant="h3" color="white" sx={{ p: 2 }}>{props.item.name}</Typography>
            </Box>
        </Container>
    );
}