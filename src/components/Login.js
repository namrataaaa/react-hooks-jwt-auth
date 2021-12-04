import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div id="loginform">
      <div>
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}
        <header id="headerTitle">
        <h2 style={{color: "blue"}}>𝕷𝖔𝖌𝖎𝖓</h2>
        </header>

        <Form onSubmit={handleLogin} ref={form}>
          <div className="myrow">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="myrow">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="myrow" style={{marginTop: "15px"}}>
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

// const FormHeader = props => (
//   <div>
//   <h2 id="headerTitle">{props.title}</h2>
//   {/* <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         /> */}
//   </div>
// );

// const Form = props => (
//   <div>
//     <FormInput htmlFor="username" description="Username" placeholder="Enter your username" 
//     type="text" className="form-control"
//               name="username"
//               value={username}
//               onChange={onChangeUsername}
//               validations={[required]}/>
//     <FormInput description="Password" placeholder="Enter your password" type="password"/>
//     <FormButton title="Log in"/>
//   </div>
// );

// const FormButton = props => (
//  <div id="button" class="row">
//    <button>{props.title}</button>
//  </div>
// );

// const FormInput = props => (
//  <div class="row">
//    <label>{props.description}</label>
//    <input type={props.type} placeholder={props.placeholder}/>
//  </div>  
// );

export default Login;
