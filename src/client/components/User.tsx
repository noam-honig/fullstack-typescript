import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import React from 'react';
import { User } from '../../shared/User';

interface IProps {
  user: User;
}

export const UserInfo: React.FC<IProps> = ({ user }) => (
  <Card data-testid='user-card'>
    <CardHeader data-testid='user-card-header' title={`User: ${user.getFullName()}`} />
    <CardContent>
      <Typography>Id: {user.userId}</Typography>
      <Typography>Image Url: {user.imageUrl}</Typography>
    </CardContent>
  </Card>
);
