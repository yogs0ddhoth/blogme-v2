
export default function Post() {

  return (
    <div className="text-center">
      <div className="card">
        <h2 className="card-header">
          {"INSER_NAME"}
        </h2>
        <p className="card-body pre-line">
        {"INSERT_DESCRIPTION"}
        </p>
        <p className="card-footer author">
        - {"INSER_USER_NAME"}, {"INSERT_FORMAT_DATE"}
        </p>
      </div>

      {/* {{#each comments as |comment|}}
      {{> comment-details}}
      {{/each}} */}

      {/* {{#if logged_in}} */}
      <form className="form comment-form" >
        <div className="form-group">
          <label>
            Comment:
            <input className="form-input" type="comment" id="comment-input" />
          </label>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
      {/* {{/if}} */}
    </div>
  )
}