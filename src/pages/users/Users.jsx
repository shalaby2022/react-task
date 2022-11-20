import "./users.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [renderUsers, setRenderUsers] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    console.log(id);
    setEditId(id);
    setShowEdit(true);
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/react-task/login");
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
        id: formikAdd.values.id,
        name: formikAdd.values.name,
        username: formikAdd.values.username,
        email: formikAdd.values.email,
        address: { city: formikAdd.values.address },
        phone: formikAdd.values.phone,
        website: formikAdd.values.website,
        company: { name: formikAdd.values.company },
      },
    ];
    setRenderUsers(rendered);
    handleCloseAdd(true);
  };

  const handleEdit = (id) => {
    let rendered = [
      ...renderUsers.map((user) =>
        user.id === id
          ? {
              id: id,
              name: formikEdit.values.name,
              username: formikEdit.values.username,
              email: formikEdit.values.email,
              address: { city: formikEdit.values.address },
              phone: formikEdit.values.phone,
              website: formikEdit.values.website,
              company: { name: formikEdit.values.company },
            }
          : user
      ),
    ];
    setRenderUsers(rendered);
    handleCloseEdit(true);
  };

  const formikAdd = useFormik({
    initialValues: {
      id: "",
      name: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      website: "",
      company: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Id Required").min("1"),
      name: Yup.string().required("Name Required").min("3"),
      username: Yup.string().required("username Required").min("3"),
      email: Yup.string().email().required("username Required").min("3"),
      address: Yup.string().required("Address Required").min("20"),
      phone: Yup.string().required("phone Required").min("10"),
      website: Yup.string().required("Website Required").min(" 10"),
      company: Yup.string().required("Company Required").min(" 6"),
    }),
    onSubmit: () => {
      handleAdd();
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      id: editId,
      name: "",
      username: "",
      email: "",
      address: "",
      phone: "",
      website: "",
      company: "",
    },
    validationSchema: Yup.object({
      // id: Yup.string().required("Id Required").min("1"),
      name: Yup.string().required("Name Required").min("3"),
      username: Yup.string().required("username Required").min("3"),
      email: Yup.string().email().required("username Required").min("3"),
      address: Yup.string().required("Address Required").min("20"),
      phone: Yup.string().required("phone Required").min("10"),
      website: Yup.string().required("Website Required").min(" 10"),
      company: Yup.string().required("Company Required").min(" 6"),
    }),
    onSubmit: (values) => {
      console.log(editId);
      handleEdit(editId);
    },
  });

  return (
    <div className="container">
      <div className="header">
        <h3>Organization Data</h3>
        <div className="btnContainer">
          <Button variant="primary" onClick={handleShowAdd}>
            Add
          </Button>
          <Modal
            show={showAdd}
            onHide={handleCloseAdd}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={formikAdd.handleSubmit} className="form">
                <div className="content">
                  <input
                    type="text"
                    placeholder="id"
                    value={formikAdd.values.id}
                    onChange={formikAdd.handleChange}
                    onBlur={formikAdd.handleBlur}
                    id="id"
                    name="id"
                    style={{ width: "90%", margin: "3px auto" }}
                  />
                  {formikAdd.touched.id && formikAdd.errors.id && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "14px",
                        padding: "3px",
                      }}
                    >
                      {formikAdd.errors.id}
                    </h6>
                  )}

                  <input
                    type="text"
                    placeholder="name"
                    value={formikAdd.values.name}
                    onChange={formikAdd.handleChange}
                    onBlur={formikAdd.handleBlur}
                    id="name"
                    name="name"
                    style={{ width: "90%", margin: "3px auto" }}
                  />
                  {formikAdd.touched.name && formikAdd.errors.name && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "14px",
                        padding: "3px",
                      }}
                    >
                      {formikAdd.errors.name}
                    </h6>
                  )}

                  <input
                    type="text"
                    placeholder="username"
                    value={formikAdd.values.username}
                    onChange={formikAdd.handleChange}
                    onBlur={formikAdd.handleBlur}
                    id="username"
                    name="username"
                    style={{ width: "90%", margin: "3px auto" }}
                  />
                  {formikAdd.touched.username && formikAdd.errors.username && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "14px",
                        padding: "3px",
                      }}
                    >
                      {formikAdd.errors.username}
                    </h6>
                  )}

                  <input
                    type="text"
                    placeholder="email"
                    value={formikAdd.values.email}
                    onChange={formikAdd.handleChange}
                    onBlur={formikAdd.handleBlur}
                    id="email"
                    name="email"
                    style={{ width: "90%", margin: "3px auto" }}
                  />
                  {formikAdd.touched.email && formikAdd.errors.email && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "14px",
                        padding: "3px",
                      }}
                    >
                      {formikAdd.errors.email}
                    </h6>
                  )}

                  <input
                    type="text"
                    placeholder="address"
                    value={formikAdd.values.address}
                    onChange={formikAdd.handleChange}
                    onBlur={formikAdd.handleBlur}
                    id="address"
                    name="address"
                    style={{ width: "90%", margin: "3px auto" }}
                  />
                  {formikAdd.touched.address && formikAdd.errors.address && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "14px",
                        padding: "3px",
                      }}
                    >
                      {formikAdd.errors.address}
                    </h6>
                  )}

                  <input
                    type="text"
                    placeholder="phone"
                    value={formikAdd.values.phone}
                    onChange={formikAdd.handleChange}
                    onBlur={formikAdd.handleBlur}
                    id="phone"
                    name="phone"
                    style={{ width: "90%", margin: "3px auto" }}
                  />
                  {formikAdd.touched.phone && formikAdd.errors.phone && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "14px",
                        padding: "3px",
                      }}
                    >
                      {formikAdd.errors.phone}
                    </h6>
                  )}

                  <input
                    type="text"
                    placeholder="website"
                    value={formikAdd.values.website}
                    onChange={formikAdd.handleChange}
                    onBlur={formikAdd.handleBlur}
                    id="website"
                    name="website"
                    style={{ width: "90%", margin: "3px auto" }}
                  />
                  {formikAdd.touched.website && formikAdd.errors.website && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "14px",
                        padding: "3px",
                      }}
                    >
                      {formikAdd.errors.website}
                    </h6>
                  )}

                  <input
                    type="text"
                    placeholder="company"
                    value={formikAdd.values.company}
                    onChange={formikAdd.handleChange}
                    onBlur={formikAdd.handleBlur}
                    id="company"
                    name="company"
                    style={{ width: "90%", margin: "3px auto" }}
                  />
                  {formikAdd.touched.company && formikAdd.errors.company && (
                    <h6
                      style={{
                        color: "red",
                        fontSize: "14px",
                        padding: "3px",
                      }}
                    >
                      {formikAdd.errors.company}
                    </h6>
                  )}
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Close
              </Button>
              <Button variant="primary" onClick={formikAdd.handleSubmit}>
                Send
              </Button>
            </Modal.Footer>
          </Modal>
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
                  <Button
                    variant="success"
                    onClick={() => handleShowEdit(user.id)}
                  >
                    Edit
                  </Button>
                  <Modal
                    show={showEdit}
                    onHide={handleCloseEdit}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form onSubmit={formikEdit.handleSubmit} className="form">
                        <div className="content">
                          {/* <input
                            type="text"
                            placeholder="id"
                            value={formikEdit.values.id}
                            onChange={formikEdit.handleChange}
                            onBlur={formikEdit.handleBlur}
                            id="id"
                            name="id"
                            style={{ width: "90%", margin: "3px auto" }}
                          />
                          {formikEdit.touched.id && formikEdit.errors.id && (
                            <h6
                              style={{
                                color: "red",
                                fontSize: "14px",
                                padding: "3px",
                              }}
                            >
                              {formikEdit.errors.id}
                            </h6>
                          )} */}

                          <input
                            type="text"
                            placeholder="name"
                            value={formikEdit.values.name}
                            onChange={formikEdit.handleChange}
                            onBlur={formikEdit.handleBlur}
                            id="name"
                            name="name"
                            style={{ width: "90%", margin: "3px auto" }}
                          />
                          {formikEdit.touched.name && formikEdit.errors.name && (
                            <h6
                              style={{
                                color: "red",
                                fontSize: "14px",
                                padding: "3px",
                              }}
                            >
                              {formikEdit.errors.name}
                            </h6>
                          )}

                          <input
                            type="text"
                            placeholder="username"
                            value={formikEdit.values.username}
                            onChange={formikEdit.handleChange}
                            onBlur={formikEdit.handleBlur}
                            id="username"
                            name="username"
                            style={{ width: "90%", margin: "3px auto" }}
                          />
                          {formikEdit.touched.username &&
                            formikEdit.errors.username && (
                              <h6
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  padding: "3px",
                                }}
                              >
                                {formikEdit.errors.username}
                              </h6>
                            )}

                          <input
                            type="text"
                            placeholder="email"
                            value={formikEdit.values.email}
                            onChange={formikEdit.handleChange}
                            onBlur={formikEdit.handleBlur}
                            id="email"
                            name="email"
                            style={{ width: "90%", margin: "3px auto" }}
                          />
                          {formikEdit.touched.email && formikEdit.errors.email && (
                            <h6
                              style={{
                                color: "red",
                                fontSize: "14px",
                                padding: "3px",
                              }}
                            >
                              {formikEdit.errors.email}
                            </h6>
                          )}

                          <input
                            type="text"
                            placeholder="address"
                            value={formikEdit.values.address}
                            onChange={formikEdit.handleChange}
                            onBlur={formikEdit.handleBlur}
                            id="address"
                            name="address"
                            style={{ width: "90%", margin: "3px auto" }}
                          />
                          {formikEdit.touched.address &&
                            formikEdit.errors.address && (
                              <h6
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  padding: "3px",
                                }}
                              >
                                {formikEdit.errors.address}
                              </h6>
                            )}

                          <input
                            type="text"
                            placeholder="phone"
                            value={formikEdit.values.phone}
                            onChange={formikEdit.handleChange}
                            onBlur={formikEdit.handleBlur}
                            id="phone"
                            name="phone"
                            style={{ width: "90%", margin: "3px auto" }}
                          />
                          {formikEdit.touched.phone && formikEdit.errors.phone && (
                            <h6
                              style={{
                                color: "red",
                                fontSize: "14px",
                                padding: "3px",
                              }}
                            >
                              {formikEdit.errors.phone}
                            </h6>
                          )}

                          <input
                            type="text"
                            placeholder="website"
                            value={formikEdit.values.website}
                            onChange={formikEdit.handleChange}
                            onBlur={formikEdit.handleBlur}
                            id="website"
                            name="website"
                            style={{ width: "90%", margin: "3px auto" }}
                          />
                          {formikEdit.touched.website &&
                            formikEdit.errors.website && (
                              <h6
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  padding: "3px",
                                }}
                              >
                                {formikEdit.errors.website}
                              </h6>
                            )}

                          <input
                            type="text"
                            placeholder="company"
                            value={formikEdit.values.company}
                            onChange={formikEdit.handleChange}
                            onBlur={formikEdit.handleBlur}
                            id="company"
                            name="company"
                            style={{ width: "90%", margin: "3px auto" }}
                          />
                          {formikEdit.touched.company &&
                            formikEdit.errors.company && (
                              <h6
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  padding: "3px",
                                }}
                              >
                                {formikEdit.errors.company}
                              </h6>
                            )}
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={formikEdit.handleSubmit}
                      >
                        Send
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
