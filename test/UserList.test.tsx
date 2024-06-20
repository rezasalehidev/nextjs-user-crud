import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserList from '../components/UserList';

const mockStore = configureStore([]);

describe('UserList component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      users: {
        users: [
          { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', avatar: '' },
          { id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jane@example.com', avatar: '' },
        ],
        loading: false,
        error: null,
      },
    });
  });

  it('renders user list correctly', async () => {
    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    const userListItems = screen.getAllByRole('listitem');
    expect(userListItems).toHaveLength(2);
  });

});
