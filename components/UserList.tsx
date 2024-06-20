"use client"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchUsers, deleteUserById } from '../store/userSlice';
import { CircularProgress, Grid, Button, Pagination, Card, CardContent, Avatar, Typography, CardActions } from '@mui/material';
import { User } from '../store/userSlice';
import EditUserModal from './EditUser';
import Link from 'next/link'

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, totalPages } = useSelector((state: RootState) => state.users);


  // State for pagination
  const [page, setPage] = useState(1);

    // State for Edit Modal User
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
  };


  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handleDelete = (id: number) => {
    dispatch(deleteUserById(id));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className='py-10 mx-auto'>
      <Grid container spacing={1}>
        {users.map((user: User) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <div className='px-10 py-5'>
              <Card sx={{ minWidth: 500 }} >
                <Link href={`/user/${user.id}`}>
                  <CardContent>
                    <Avatar alt="Avatar" src={user.avatar} />
                    <Typography sx={{ fontSize: 14 }} mt={2} color="text.secondary" gutterBottom>
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="h5" component="div" mt={2}>
                      {user.email}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions>
                  <Button size="small" className='text-red-500' onClick={() => handleDelete(user.id)}>Delete</Button>
                  <Button size="small" className='text-red-500' onClick={() => handleOpenEditModal(user)}>Edit</Button>
                </CardActions>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 5, marginLeft: 4 }}
      />
      <EditUserModal open={openEditModal} onClose={handleCloseEditModal} id={Number(selectedUser?.id)} />
    </div>
  );
};

export default UserList;
