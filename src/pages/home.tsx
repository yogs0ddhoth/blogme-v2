export default function Home() {

  return (
  <div className="mb-4 box-content text-center">
    <div className="bg-react-blue text-react-background">
      <h2>
        <a href="/post/{{post.id}}">
          {/* {{post.name}} */}
          post name
        </a>
      </h2>
      <p className="author">
        {/* Created by {{post.user.name}} on {{format_date post.date_created}} */}
        created by
      </p>
    </div>
    <div className="card-body">
      <p className="whitespace-pre-line">
        {/* {{post.description}} */}
        description
      </p>
    </div>
  </div>
  )
}