from models import User, Post, Comment, Vote
from db import Session, Base, engine

# drop and rebuild tables
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

db = Session()

# insert users
db.add_all(
  [
    User(
      name='seed1', 
      email='seed1@cbc.ca', 
      password='password123'
    ),
    User(
      name='seed2', 
      email='seed2@sogou.com', 
      password='password123'
    ),
    User(
      name='seed3', 
      email='seed3@last.fm', 
      password='password123'
    ),
    User(
      name='seed4', 
      email='seed4@goo.ne.jp', 
      password='password123'
    ),
    User(
      name='seed5', 
      email='seed5@weather.com', 
      password='password123'
    )
  ]
)
db.commit()

#  insert posts
db.add_all(
  [
    Post(
      title='Donec posuere metus vitae ipsum', 
      text='https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png', 
      user_id=1
    ),
    Post(
      title='Morbi non quam nec dui luctus rutrum', 
      text='https://nasa.gov/donec.json', 
      user_id=1
    ),
    Post(
      title='Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue', 
      text='https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx', 
      user_id=2
    ),
    Post(
      title='Nunc purus', 
      text='http://desdev.cn/enim/blandit/mi.jpg', 
      user_id=3
    ),
    Post(
      title='Pellentesque eget nunc', 
      text='http://google.ca/nam/nulla/integer.aspx', 
      user_id=4
    )
  ]
)
db.commit()

# insert comments
db.add_all([
  Comment(
    text='Nunc rhoncus dui vel sem.', 
    user_id=1, 
    post_id=2
  ),
  Comment(
    text='Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 
    user_id=1, 
    post_id=3
  ),
  Comment(
    text='Aliquam erat volutpat. In congue.', 
    user_id=2, 
    post_id=1
  ),
  Comment(
    text='Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 
    user_id=2, 
    post_id=3
  ),
  Comment(
    text='In hac habitasse platea dictumst.', 
    user_id=3, 
    post_id=3
  )
])
db.commit()

# insert votes
db.add_all([
  Vote(user_id=1, post_id=2),
  Vote(user_id=1, post_id=4),
  Vote(user_id=2, post_id=4),
  Vote(user_id=3, post_id=4),
  Vote(user_id=4, post_id=2)
])
db.commit()

db.close()