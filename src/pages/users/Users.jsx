import "./users.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [renderUsers, setRenderUsers] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(({ data }) => {
          setUsers(data);
          setRenderUsers(data);
        });
    };
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    let rendered = [...renderUsers.filter((user) => user.id !== id)];
    setRenderUsers(rendered);
  };

  const handleAdd = () => {
    let rendered = [
      ...renderUsers,
      {
        id: Math.floor(Math.random() * 999),
        name: `test ${Math.floor(Math.random() * 999)}`,
        username: `usertest${Math.floor(Math.random() * 999)}`,
        email: `test@test ${Math.floor(Math.random() * 999)}`,
        address: { city: `Newcity ${Math.floor(Math.random() * 999)}` },
        phone: "+10 00 54 655",
        website: `test.org ${Math.floor(Math.random() * 999)}`,
        company: { name: `test comp ${Math.floor(Math.random() * 999)}` },
      },
    ];
    setRenderUsers(rendered);
  };

  const handleEdit = (id) => {
    let rendered = [
      ...renderUsers.map((user) =>
        user.id === id
          ? {
              id: Math.floor(Math.random() * 999),
              name: `test ${Math.floor(Math.random() * 999)}`,
              username: `usertest${Math.floor(Math.random() * 999)}`,
              email: `test@test ${Math.floor(Math.random() * 999)}`,
              address: { city: `Newcity ${Math.floor(Math.random() * 999)}` },
              phone: "+10 00 54 655",
              website: `test.org ${Math.floor(Math.random() * 999)}`,
              company: { name: `test comp ${Math.floor(Math.random() * 999)}` },
            }
          : user
      ),
    ];

    setRenderUsers(rendered);
  };

  return (
    <div className="container">
      <div className="header">
        <h3>Organization Data</h3>
        <div className="btnContainer">
          <button className="Add" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
      <Table striped bordered hover className="table">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>#</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company name</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {renderUsers &&
            renderUsers.map((user) => (
              <tr style={{ textAlign: "center" }} key={user.id}>
                <th>{user.id}</th>
                <th>{user.name}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
                <th>{user.address.city}</th>
                <th>{user.phone}</th>
                <th>{user.website}</th>
                <th>{user.company.name}</th>
                <th>
                  <button
                    className="Delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </th>
                <th>
                  <button className="Edit" onClick={() => handleEdit(user.id)}>
                    Edit
                  </button>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
