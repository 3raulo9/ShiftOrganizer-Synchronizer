import React, { useState } from 'react';
import '../styles/UserForm.css';

const UserForm = ({ numUsers, setNumUsers, handleSubmit, setLoading }) => {
  const [formFields, setFormFields] = useState([{ company_id: '', username: '', password: '' }]);

  const handleInputChange = (index, event) => {
    const values = [...formFields];
    values[index][event.target.name] = event.target.value;
    setFormFields(values);
  };

  const handleAddFields = () => {
    setNumUsers(numUsers + 1);
    setFormFields([...formFields, { company_id: '', username: '', password: '' }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...formFields];
    values.splice(index, 1);
    setFormFields(values);
    setNumUsers(numUsers - 1);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);  // Set loading to true when the form is submitted
    const data = { num_users: numUsers };
    formFields.forEach((field, index) => {
      data[`company_id_${index}`] = field.company_id;
      data[`username_${index}`] = field.username;
      data[`password_${index}`] = field.password;
    });
    await handleSubmit(data);
    setLoading(false);  // Set loading to false after the form is submitted and data is handled
  };

  return (
    <div className="container">
      <section className="text-center">
        <div
          className="p-5 bg-image"
          style={{ backgroundImage: "url('https://www.shiftorganizer.com/wp-content/uploads/2017/10/Shift_dark.jpg')", height: '300px' }}
        ></div>
        <div className="card mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-5">Enter your users</h2>
                <form onSubmit={onSubmit}>
                  {formFields.map((field, index) => (
                    <div key={index} className="form-group">
                      <label htmlFor={`company_id_${index}`}>Company ID:</label>
                      <input
                        type="text"
                        id={`company_id_${index}`}
                        name="company_id"
                        value={field.company_id}
                        onChange={(event) => handleInputChange(index, event)}
                        className="form-control mb-4"
                        required
                      />
                      <label htmlFor={`username_${index}`}>Username:</label>
                      <input
                        type="text"
                        id={`username_${index}`}
                        name="username"
                        value={field.username}
                        onChange={(event) => handleInputChange(index, event)}
                        className="form-control mb-4"
                        required
                      />
                      <label htmlFor={`password_${index}`}>Password:</label>
                      <input
                        type="password"
                        id={`password_${index}`}
                        name="password"
                        value={field.password}
                        onChange={(event) => handleInputChange(index, event)}
                        className="form-control mb-4"
                        required
                      />
                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFields(index)}
                          className="btn btn-danger"
                        >
                          Delete User
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="btn-container">
                    <button type="button" onClick={handleAddFields} className="btn btn-success">
                      Add User
                    </button>
                    <input type="submit" value="Submit" className="btn btn-primary" />
                    <input type="submit" value="Test" className="btn btn-info" />

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserForm;
