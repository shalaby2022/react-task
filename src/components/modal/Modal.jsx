import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";

const ModalPopUp = (props) => {
  console.log(props);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      username: "",
      address: "",
      phone: "",
      website: "",
      company: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Id Required"),
      name: Yup.string().required("Name Required"),
      username: Yup.string().required("username Required"),
      address: Yup.string().required("Address Required"),
      phone: Yup.string().required("phone Required"),
      website: Yup.string().required("Website Required"),
      company: Yup.string().required("Company Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="form">
            <div className="content">
              <h1 className="header">Add User</h1>

              <input
                type="text"
                placeholder="id"
                value={formik.values.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="id"
                name="id"
              />
              {formik.touched.id && formik.errors.id && (
                <h6 className="error">{formik.errors.id}</h6>
              )}

              <input
                type="text"
                placeholder="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="name"
                name="name"
              />
              {formik.touched.name && formik.errors.name && (
                <h6 className="error">{formik.errors.name}</h6>
              )}

              <input
                type="text"
                placeholder="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="username"
                name="username"
              />
              {formik.touched.username && formik.errors.username && (
                <h6 className="error">{formik.errors.username}</h6>
              )}

              <input
                type="text"
                placeholder="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="address"
                name="address"
              />
              {formik.touched.address && formik.errors.address && (
                <h6 className="error">{formik.errors.address}</h6>
              )}

              <input
                type="text"
                placeholder="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="phone"
                name="phone"
              />
              {formik.touched.phone && formik.errors.phone && (
                <h6 className="error">{formik.errors.phone}</h6>
              )}

              <input
                type="text"
                placeholder="website"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="website"
                name="website"
              />
              {formik.touched.website && formik.errors.website && (
                <h6 className="error">{formik.errors.website}</h6>
              )}

              <input
                type="text"
                placeholder="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="company"
                name="company"
              />
              {formik.touched.company && formik.errors.company && (
                <h6 className="error">{formik.errors.company}</h6>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalPopUp;
