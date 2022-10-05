# blogme-v2

Version 2 of the previous [Blogme](https://github.com/yogs0ddhoth/blogme) application

### [Link to deployed app](https://yogs0ddhoth-blogme-v2.herokuapp.com/)

## Installation
Set up an ```.env``` file with a ```DB_URL``` variable containing an SQL [Database URL](https://docs.sqlalchemy.org/en/14/core/engines.html#database-urls), and a ```SECRET_KEY``` used to create a JSON web token.

#### Server setup:
```
// activate venv, command varies by os
pip install -r requirements.txt 
```

#### Client setup:
```
npm install
npm run setup   
```
this will seed the database, build, and serve the app at http://localhost:5000/ 

### Running the App 
After setup, the app can be run with
```
npm run dev
```
which will build and serve the app at the above url