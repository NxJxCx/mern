# MERN Stack Project
> ### MongoDB
> NoSQL Database Management System
> ### ExpressJS
> Backend Web Application Framework for NodeJS (API Server)
> ### ReactJS 
> JavaScript library for developing UIs based on UI components (Frontend Development Framework)
> ### NodeJS
> JavaScript runtime environment (It enables running Javascript code outside the browser)

**_The main purpose of using MERN stack is to develop apps using JavaScript only_** 

### Download or clone
You can download or clone the repository with git command terminal:
```bash
git clone https://github.com/NxJxCx/mern.git
```
> Note: if you are in Windows platform, it is necessary to download and install [Git-For-Windows](https://git-scm.com/download/win).
> If you haven't yet installed Git-For-Windows, you can download [here](https://git-scm.com/download/win)
> Also, NodeJS is required to be installed to be able run the Front-End and Back-End Server. You can download it [here](https://nodejs.org/en/download/)

### Files to Add/Modify/Edit:
**Front-End (client_view)**
- `client_view/public/index.html` - You can add/remove/modify tags inside head tag for css or js or any css/js bootstrap
- `client_view/public/**` - You can add or modify `css` and `js` and/or `assets` folders for local resources
- `client_view/src/App.js` - Add or modify `<Route />` tag inside this file for front-end routes
- `client_view/src/App.css` - Modify this file for default App's css styles
- `client_view/src/components/*.js` - Add/Modify/Edit any `*.js` files inside `client_view/src/components/` folder for page displays
- `client_view/src/components/*.css` - Add/Modify/Edit any `*.css` files inside `client_view/src/components/` folder for reactjs component page styles imports inside `*.js` files

**Back-End(API/Database) (api)**
- `api/app.js` - Add lines like `app.use("/myroute", myroute);` where `myroute` is an express router imported from `api/routes` folder
- `api/routes/*.js` - Add/Modify/Edit js files for your desired routers api to import inside `api/app.js`
- `api/model/model.js` - Add/Modify/Edit MongoDB database schemes and models. 
- `api/bin/www` - Edit this file if you want to add a secure `https` host api server
- `api/config.env` - Edit the environment variables inside this file. Example: `MONGO_URI="mongodb://127.0.0.1:27017/test"`
> Modifying environment variables inside `api/config.env` are used as constant variables for all files inside `api` folder. They are called using `process.env.CONSTANT_VARIABLE_NAME`. Example:
```bash
# inside api/config.env
MONGO_URI = "mongodb://127.0.0.1:27017/test"
API_PORT = 4000
```
```javascript
// inside api/app.js
...
connectDB(process.env.MONGO_URI);
...
```
### To update and install any missing nodejs modules inside `api` and `client_view`, simply enter these commands:
- For the `api` folder
```bash
cd api
npm install
```
- For the `client_view` folder
```bash
cd client_view
npm install
```

### To Run a Local Server:
- For the front-end (reactjs)
```bash
cd client_view
npm start
```
- For the API server (express)
```bash
cd api
npm run dev
```

> Note: To successfully run the API server with mongodb connection to `mongodb://127.0.0.1:27017` localhost uri,
> You will need to download [MongoDB Community Server](https://www.mongodb.com/try/download/community)
> - For database connection/access through terminal or shell, download [MongoDB Shell](https://www.mongodb.com/try/download/shell)
> - For database connection/access through GUI download [MongoDB Compass](https://www.mongodb.com/try/download/compass).

