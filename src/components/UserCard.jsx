import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
    return (
        <Card className="shadow-md transition-all hover:shadow-xl rounded-lg border border-gray-200">
            <CardContent className="p-6">
                <Typography variant="h6" component="h2" className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                    {user.email}
                </Typography>
                <Link to={`/users/${user.id}`} className="text-blue-500 underline mt-2 block">
                    Detayları Gör
                </Link>
            </CardContent>
        </Card>
    );
};

export default UserCard;
