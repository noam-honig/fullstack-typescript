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
    create?: boolean;
}
export const UserEditor: React.FC<IProps> = ({ user, onClose, onSaved, create }) => {
    const fields = React.useMemo(() => {
        let f = userRepo.metadata.fields;
        return [f.firstName, f.lastName, f.imageUrl];
    }, []);
    const [state, setState] = React.useState(() => fields.reduce((result, field) => ({ ...result, [field.key]: user[field.key] }), {}));
    const [errors, setErrors] = React.useState<ErrorInfo<User>>(null);
    const handleClose = () => {
        onClose();
    };
    const handleSave = async () => {
        setErrors(null);

        try {
            const newUser = await userRepo.save({
                ...state,
                userId: user.userId
            }, create);
            onSaved(newUser);
            handleClose();
        }
        catch (err: any) {

            setErrors(err);
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
                >{fields.map((field, i) => (<TextField
                    autoFocus={i == 0}
                    id={field.key}
                    label={field.caption}
                    fullWidth
                    value={state[field.key]}
                    onChange={e => setState({ ...state, [field.key]: e.target.value })}
                    error={Boolean(errors?.modelState[field.key])}
                    helperText={errors?.modelState[field.key]}
                />))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}