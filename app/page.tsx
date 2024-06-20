"use client"
import { Button } from '@mui/material';
import UserList from '../components/UserList';
import { fetchUsers } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import AddUserModal from '@/components/AddUser';
import { useState } from 'react';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-between w-full px-10'>
        <Button
          onClick={() => dispatch(fetchUsers(1))}
          className='mt-8'
          variant="contained"
          color="primary">
          Reload Page
        </Button>
        <Button
          onClick={() => setOpenModal(true)}
          className='mt-8'
          variant="contained"
          color="primary"
        >
          Add New User
        </Button>
      </div>
      <UserList />
      <AddUserModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default Home;
