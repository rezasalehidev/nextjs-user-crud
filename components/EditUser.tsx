import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, TextField, Button } from '@mui/material';
import { updateUserById } from '../store/userSlice';
import { User } from '../store/userSlice';
import { AppDispatch, RootState } from '@/store';

interface Props {
    open: boolean;
    onClose: () => void;
    id: number;
}

const EditUserModal: React.FC<Props> = ({ open, onClose, id }) => {
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) =>
        state.users.users.find((user) => user.id === Number(id))
    );

    const [firstName, setFirstName] = useState(user?.first_name);
    const [lastName, setLastName] = useState(user?.last_name);
    const [email, setEmail] = useState(user?.email);


    useEffect(() => {
        setFirstName(user?.first_name);
        setLastName(user?.last_name);
        setEmail(user?.email);
    }, [user]);

    const handleEditUser = () => {
        if (!firstName || !lastName || !email) {
            alert('Please fill in all fields.');
            return;
        }
        const updatedUser = {
            ...user,
            first_name: firstName,
            last_name: lastName,
            email: email,
        };
        dispatch(updateUserById(updatedUser as User))
            .then(() => {
                onClose();
                alert(`user ${updatedUser.first_name} ${updatedUser.last_name} has been updated`)
            });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <h2 className='mb-10'>Edit User</h2>
                <TextField
                    label="First Name"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleEditUser}>
                    Save Changes
                </Button>
            </Box>
        </Modal>
    );
};

export default EditUserModal;
