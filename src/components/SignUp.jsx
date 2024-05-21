import React, { useEffect, useState } from "react";
import "../login.css";
import axios from "axios";
import Cookies from 'js-cookie';

function SignUp() {
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const onLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios.post('http://localhost:5000/login', { name, password })
      .then(res => {
        if (res.data.validation) {
          alert('Đăng nhập thành công!');
          Cookies.set('loggedIn', true);
          Cookies.set('userid', res.data.userid)
          Cookies.set('username', name);
          window.location.href = '/';
        } else {
          alert('Sai mật khẩu!'+ res.data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const onSignUp = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios
      .post("http://localhost:5000/signup", { name, password })
      .then((res) => {
        if (res.data.success) {
          alert("Đăng ký thành công!"+res.data.error);
          window.location.reload();
          // Redirect to login page or handle success as needed
        } else {
          alert("Đăng ký thất bại!" + res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container-login");

    // Functions to toggle sign up mode
    const toggleSignUpMode = () => container.classList.add("sign-up-mode");
    const toggleSignInMode = () => container.classList.remove("sign-up-mode");

    if (sign_up_btn && sign_in_btn) {
      sign_up_btn.addEventListener("click", toggleSignUpMode);
      sign_in_btn.addEventListener("click", toggleSignInMode);
    }

    // Cleanup function to remove event listeners
    return () => {
      if (sign_in_btn && sign_up_btn) {
        sign_in_btn.removeEventListener("click", toggleSignInMode);
        sign_up_btn.removeEventListener("click", toggleSignUpMode);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="container-login">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={onLogin} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
              </div>
              <button type="submit" className="btn solid">Sign in</button>
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form onSubmit={onSignUp} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn solid">Sign up</button>
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Join now to unlock the full movie experience! Sign up today.
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src="" className="image" id="image-drag" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>Welcome back! Sign in now for more movie magic!</p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src="" className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
