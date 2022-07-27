export default function Login() {
  return (
    <div className="row">
      <div className="col-md-6">
        <h2>Login</h2>

        <form className="form login-form">
          <div className="form-group">
            <label>
              email:
              <input className="form-input" type="text" id="email-login" />
            </label>
          </div>
          <div className="form-group">
            <label>
              password:
              <input className="form-input" type="password" id="password-login" />
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">login</button>
          </div>
        </form>
        <a href="/signup" className="" id="">signup instead</a>
      </div>
    </div>
  )
}