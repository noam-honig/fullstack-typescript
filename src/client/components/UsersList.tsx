import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import { remult } from '../utils/api-facade';
import { User } from '../../shared/User';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Stack } from '@mui/material';
import { UserEditor } from './UserEditor';

const userRepo = remult.repo(User);

export const UsersList: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [editUser, setEditUser] = React.useState<User>(null);
  const [newUser, setNewUser] = React.useState<User>(null);

  const editUserSaved = (editUser: User) =>
    setUsers(users.map(user => user.userId === editUser.userId ? editUser : user));

  const newUserSaved = (newUser: User) =>
    setUsers([...users, newUser]);
  const deleteUser = async (user: User) => {
    await userRepo.delete(user);
    setUsers(users.filter(u => u.userId !== user.userId));
  }


  React.useEffect(() => {
    let cancelled = false;
    const fetchUsers = async () => {
      setIsLoading(true);
      const users = await userRepo.find({
        orderBy: {
          firstName: "asc",
          lastName: "asc"
        }
      });
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
              <ListItem key={user.userId}
                secondaryAction={<Stack direction="row" spacing={2}>
                  <IconButton edge="end" aria-label="edit"
                    onClick={() => deleteUser(user)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit"
                    onClick={() => setEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                </Stack>
                }
              >{user.getFullName()}</ListItem>
            ))}
          </List>
          <Button onClick={() => setNewUser(userRepo.create())}>Add User</Button>
        </CardContent>
      </Card>
      {editUser && <UserEditor
        user={editUser}
        onClose={() => setEditUser(null)}
        onSaved={editUserSaved} />}

      {newUser && <UserEditor
        user={newUser}
        create={true}
        onClose={() => setNewUser(null)}
        onSaved={newUserSaved} />}
    </Grid>
  );
};
