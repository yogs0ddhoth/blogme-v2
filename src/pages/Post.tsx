export default function Post() {
  // state: {Post}
  return (
    <div className="text-center text-[white] border-2 border-solid ">
      <div className="border-b-2 ">
        <h2 className="p-1">
          {"INSER_NAME"}
        </h2>
        <p className="p-1 whitespace-pre-line">
        {"INSERT_DESCRIPTION"}
        </p>
        <p className="border-t-2 author">
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
            <input className="form-input border-2 bg-react-background" type="comment" id="comment-input" />
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