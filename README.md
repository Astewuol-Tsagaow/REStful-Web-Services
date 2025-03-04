# REStful-Web-Services


## ✨ Introduction
Cost Manager API is a backend service built using **Node.js** and **Express.js** for managing financial expenses and users. It utilizes **MongoDB** as the database and follows RESTful principles.

## ⚡ Features
- User management (CRUD operations)
- Expense tracking and reporting
- Developer team information retrieval
- Database connectivity using **Mongoose**
- Debugging with **debug** package

## 📚 Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **Debug** for logging
- **Cross-env** for environment management

## ⚙ Installation & Setup
### 1. Clone the repository
```bash
git clone https://github.com/Astewuol-Tsagaow/REStful-Web-Services.git
cd astewuolversion
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure MongoDB Connection
Make sure MongoDB is running locally or update the connection string in `connectTodb` function inside `app.js`.

```js
mongoose.connect("mongodb://localhost:27017/costManager");
```

### 4. Run the server
#### Development Mode
```bash
npm start
```

## 💡 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/api` | Base API route |
| POST   | `/api/add` | Add a new cost |
| GET    | `/api/report` | Retrieve cost reports |
| GET    | `/api/users` | Retrieve all users |
| GET    | `/api/users/:id` | Retrieve a specific user |
| GET    | `/api/about` | Developer team information |

## ⚛ Contributing
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a **Pull Request**.

## 📢 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Feel free to contribute and improve this project! Happy coding! 🌟

