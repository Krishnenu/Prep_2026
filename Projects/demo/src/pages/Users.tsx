import { useEffect, useState } from "react";
import "../styles/Users.css";

type User = {
  id: number;
  username: string;
  password: string;
};

export const Users = () => {
  const [userList, setUserList] = useState<User[]>([]);

  const addUser = () => {
    setUserList((prev) => [...prev]);
  };

  console.log(userList);
  useEffect(() => {
    fetch("https://localhost:7286/users")
      .then((res) => res.json())
      .then((data: User[]) => setUserList(data));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>User Management</h2>

        <div className="form-group">
          <input type="text" placeholder="Name" />
          <input type="password" placeholder="Password" />
          <button onClick={addUser}>Add User</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
