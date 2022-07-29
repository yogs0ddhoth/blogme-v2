export default function Dashboard() {
  // state: {userPosts: Post[]}
  return (
    <div className="grid grid-cols-6 text-[white]">
      <div className="col-span-6">
        <div className="col-auto">
          <h2>
            Welcome, {"INSER_NAME"}!
          </h2>
        </div>
      </div>

      {/* <div className="row-span-4 mt-4"> */}
        <div className="col-span-6 md:col-span-3">
          <h3>Create a New Post:</h3>

          <form className="form new-post-form">
            <div className="block w-full m-3">
              <label>
                Title:
                <input className="bg-react-background border-2 border-white color-white" type="text" id="post-name" name="post-name" />
              </label>
            </div>
            <div className="block w-full m-3">
              <label>
                Post:
                <textarea className="bg-react-background border-2 border-white color-white" id="post-desc" name="post-desc"/>
              </label>
            </div>
            <div className="block w-full m-3">
              <button type="submit" 
                className="
                  inline-block py-2 px-5 m-0 
                  rounded-md border-2 border-solid 
                  text-center no-underline"
              >
                Create
              </button>
            </div>
          </form>
        </div>

        {/* {{#if posts.length}} */}
        <div className="col-span-6 md:col-span-2 post-list">
          <h3>Posts:</h3>

          {/* {{#each posts as |post|}} */}
          <div className="col-md-8 card-2">
            <h4 className="bg-react-blue text-react-background">
              <a href="/post/{{post.id}}" className="card-link">
                {"INSER_POST_NAME"}
              </a>
            </h4>
            <textarea className="p-1 bg-react-background border-2 border-white color-white whitespace-pre-line">
              {"INSERT_POST_DESCRIPTION"}
            </textarea>
            <div className="col-md-4">
            <button type="submit" 
              className="
                inline-block py-2 px-5 m-0 
                rounded-md border-2 border-solid 
                text-center no-underline"
            >
              DELETE
            </button>
            </div>
          </div>
          {/* {{/each}} */}
          
        </div>
        {/* {{/if}} */}
      </div>
    // </div>
  )
}