import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { User } from '../../shared/User';
import { Box } from '@mui/material';

interface IProps {
    user: User;
    onClose: () => void;
    onSaved: (user: User) => void;
    create?: boolean;
}
export const UserEditor: React.FC<IProps> = ({ user, onClose, onSaved, create }) => {
    const [, refresh] = React.useState({});
    const handleClose = () => {
        user._.undoChanges();
        onClose();
    };
    const handleSave = async () => {
        try {
            await user.save()
            onSaved(user);
            handleClose();
        }
        catch (err: any) {
        }
    }
    return (
        <Dialog open={Boolean(user)} onClose={handleClose}>
            <DialogTitle>{create ? "Create " : "Update "} User</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {[
                        user.$.firstName,
                        user.$.lastName,
                        user.$.imageUrl
                    ].map((field, index) => (
                        <TextField
                            autoFocus={index === 0}
                            key={field.metadata.key}
                            id={field.metadata.key}
                            label={field.metadata.caption}
                            fullWidth
                            value={field.value}
                            onChange={e => { field.value = e.target.value; refresh({}) }}
                            error={Boolean(field.error)}
                            helperText={field.error}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}