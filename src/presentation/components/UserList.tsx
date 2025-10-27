import React from "react";

export type User = {
  id: string;
  name: string;
  email: string;
};

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => (
  <div>
    <h2>Usuarios</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong> - {user.email}
        </li>
      ))}
    </ul>
  </div>
);
