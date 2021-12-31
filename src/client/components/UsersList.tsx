import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { remult } from '../utils/api-facade';
import { User } from '../../shared/User';

const userReop = remult.repo(User);

export const UsersList: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    const fetchUsers = async () => {
      setIsLoading(true);
      const users = await userReop.find();
      if (!cancelled) {
        setUsers(users);
        setIsLoading(false);
      }
    };

    fetchUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Users List' />
          <CardContent>
            <List>
              {users.map((user) => (
                <ListItem key={user.userId}>{user.getFullName()}</ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
  );
};
