export default function Signup() {

  return (
    <div className="row">
      <div className="col-md-6">
        <h2>Signup</h2>

        <form className="form signup-form">
          <div className="form-group">
            <label>
              name:
              <input className="form-input" type="text" id="name-signup" />
            </label>
          </div>
          <div className="form-group">
            <label>
              email:
              <input className="form-input" type="text" id="email-signup" />
            </label>
          </div>
          <div className="form-group">
            <label>
              password:
              <input className="form-input" type="password" id="password-signup" />
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}