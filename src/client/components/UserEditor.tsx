import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { User } from '../../shared/User';
import { remult } from '../utils/api-facade';
import { Box } from '@mui/material';
import { ErrorInfo } from 'remult';

const userRepo = remult.repo(User);

interface IProps {
    user: User;
    onClose: () => void;
    onSaved: (user: User) => void;
}
export const UserEditor: React.FC<IProps> = ({ user, onClose, onSaved }) => {
    const [firstName, setFirstName] = React.useState(user.firstName);
    const [lastName, setLastName] = React.useState(user.lastName);
    const [imageUrl, setImageUrl] = React.useState(user.imageUrl);
    const [errors, setErrors] = React.useState<ErrorInfo<User>>(null);
    const handleClose = () => {
        onClose();
    };
    const handleSave = async () => {
        setErrors(null);
        const ref = userRepo.getEntityRef(user);
        try {
            user.firstName = firstName;
            user.lastName = lastName;
            user.imageUrl = imageUrl;
            const newUser = await userRepo.save(user);
            onSaved(newUser);
            handleClose();
        }
        catch (err: any) {
            ref.undoChanges();
            setErrors(err);
        }
    }
    return (
        <Dialog open={Boolean(user)} onClose={handleClose}>
            <DialogTitle>User Info</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        autoFocus
                        id="firstName"
                        label="First Name"
                        fullWidth
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        error={Boolean(errors?.modelState?.firstName)}
                        helperText={errors?.modelState?.firstName}
                    />
                    <TextField
                        id="lastName"
                        label="Last Name"
                        fullWidth
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        error={Boolean(errors?.modelState?.lastName)}
                        helperText={errors?.modelState?.lastName}
                    />
                    <TextField
                        id="imageUrl"
                        label="Image Url"
                        fullWidth
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        error={Boolean(errors?.modelState?.imageUrl)}
                        helperText={errors?.modelState?.imageUrl}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}