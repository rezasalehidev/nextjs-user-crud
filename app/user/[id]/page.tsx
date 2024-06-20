"use client"
import CustomCard from '@/components/CustomCard';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const UserDetail = ({ params }: { params: { id: number } }) => {
    const { id } = params;
    const user = useSelector((state: RootState) =>
        state.users.users.find((user) => user.id === Number(id))
    );

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            <CustomCard avatar={user.avatar} firstName={user.first_name} lastName={user.last_name} email={user.email} />
        </div>
    );
};

export default UserDetail;
