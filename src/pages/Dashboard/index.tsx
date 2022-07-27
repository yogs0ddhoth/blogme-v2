export default function Dashboard() {

  return (
    <>
      <div className="row">
        <div className="col-auto">
          <h2>
            Welcome, {"INSER_NAME"}!
          </h2>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h3>Create a New Post:</h3>

          <form className="form new-post-form">
            <div className="form-group">
              <label>
                Title:
                <input className="form-input" type="text" id="post-name" name="post-name" />
              </label>
            </div>
            <div className="form-group">
              <label>
                Post:
                <textarea className="form-input" id="post-desc" name="post-desc"/>
              </label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>

        {/* {{#if posts.length}} */}
        <div className="col-md-6 post-list">
          <h3>Posts:</h3>

          {/* {{#each posts as |post|}} */}
            <div className="col-md-8 card-2">
              <h4 className="card-header">
                <a href="/post/{{post.id}}" className="card-link">
                  {"INSER_POST_NAME"}
                </a>
              </h4>
              <textarea className="card-body pre-line">{"INSERT_POST_DESCRIPTION"}</textarea>
              <div className="col-md-4">
                <button type="submit" className="btn btn-sm btn-danger">DELETE</button>
              </div>
            </div>
          {/* {{/each}} */}
          
        </div>
        {/* {{/if}} */}
      </div>
    </>
  )
}