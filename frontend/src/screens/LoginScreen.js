import React, { useState } from "react";

const LoginScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newUserToggle, setNewUserToggle] = useState(false);

  const createUserHandler = () => {
    //Create User
  };

  const loginHandler = () => {
    //login
  };

  const toggleNewUserHandler = (e) => {
    e.preventDefault();
    //toggle new user
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto col-md-12 col-lg-12">
          <li className="list-group-item my-2">
            <form>
              <div className="row">
                <div className="input-group col-12  my-1">
                  <div className="input-group-prepend">
                    <div className="input-group-text bg-primary text-white">
                      <i className="fas fa-user" />
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control text-capitalize"
                    placeholder={
                      newUserToggle ? "Username" : "Username/Email Address"
                    }
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-group col-12 my-1">
                  <div className="input-group-prepend">
                    <div className="input-group-text bg-primary text-white">
                      <i className="fas fa-key" />
                    </div>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {newUserToggle ? (
                <React.Fragment>
                  <div className="row">
                    <div className="input-group col-12 my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-primary text-white">
                          <i className="fas fa-key" />
                        </div>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Verify Password"
                        value={passwordVerify}
                        onChange={(e) => setPasswordVerify(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group col-6  my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-primary text-white">
                          <i className="fas fa-id-card" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control text-capitalize"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="input-group col-6 my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-primary text-white">
                          <i className="fas fa-id-card" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control text-capitalize"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group col-12 my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-primary text-white">
                          <i className="fas fa-at" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-group col-12 my-1">
                      <div className="input-group-prepend">
                        <div className="input-group-text bg-primary text-white">
                          <i className="fas fa-at" />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Verify Email Address"
                        value={emailVerify}
                        onChange={(e) => setEmailVerify(e.target.value)}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
              <div className="row mx-auto">
                <button
                  type="submit"
                  onClick={newUserToggle ? createUserHandler : loginHandler}
                  className="btn btn-block btn-primary col-5 mr-auto mt-1"
                >
                  {newUserToggle ? "Create" : "Login"}
                </button>
                <span className="ml-4 mr-4" />
              </div>
              <button
                onClick={() => toggleNewUserHandler()}
                className="btn btn-block btn-info col-5 ml-auto mt-1"
              >
                {newUserToggle ? "Back to Login" : "Create User"}
              </button>
              {/*value.errorView ? (
                <div className="row">
                  <li className="list-group-item text-center my-2 mx-auto border-danger col-11 bg-danger text-white">
                    {value.errorText}
                  </li>
                </div>
              ) : (
                ""
			  )*/}
            </form>
          </li>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
