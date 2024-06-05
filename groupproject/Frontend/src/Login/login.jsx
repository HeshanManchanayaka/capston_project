import "./login.css";

function Login() {
  <a href="#" className="auth-button">Login</a>
  return (
    <div className="container" >
      <div className="image-section">
        <img
          src="../assets/user/log.png"
          alt="Woman practicing yoga"
        />
      </div>
      <div className="form-section" >
        <div className="form-container">
          <div className="back-button">
            <a href="./">&lt; Back</a>
          </div>
          <h2>Account Loging</h2>
          <p>
            If you are already a member you can login<br></br> with your email address
            and password.
          </p>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <button type="button" className="register-btn">
              Login Account
            </button>
            <p>
              Do not have an account? <a href="./Register">Sign up here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
