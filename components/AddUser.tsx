import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Box, TextField, Button } from '@mui/material';
import { addUser } from '../store/userSlice';
import { AppDispatch } from '@/store';

const AddUserModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleAddUser = () => {
        if (!firstName || !lastName || !email) {
            alert('Please fill in all fields.');
            return;
        }
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email: email,
        };

        dispatch(addUser(newUser))
            .then(() => {
                onClose();
                setFirstName('');
                setLastName('');
                setEmail('');
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
                <h2 className='mb-10'>Add New User</h2>
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
                <Button variant="contained" onClick={handleAddUser}>
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default AddUserModal;
