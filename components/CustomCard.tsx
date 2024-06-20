import React from 'react'
import { Avatar, Card, CardContent, Typography } from '@mui/material';

interface UserProps {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
}

const CustomCard = (user: UserProps) => {
    return (
        <Card>
            <CardContent>
                <Avatar alt="Avatar" src={user.avatar} />
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="h5" component="div">
                    {user.email}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CustomCard