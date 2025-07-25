# 🚀 SnapLink — Modern URL Shortener & Analytics Platform

> **Live Demo**  
> 👉 [https://magical-macaron-37b9cb.netlify.app/](https://magical-macaron-37b9cb.netlify.app/)

SnapLink makes it easy to create short, secure URLs, manage your links, and analyze your click traffic—all in a clean, modern web app.

---

## ✨ Features

- 🔑 **JWT Auth with Refresh Tokens** — Secure login, session renewal  
- 🔗 **Shorten & Share Links** — Unique, user-specific short links  
- 📊 **Track Your Links** — Visual analytics for each link  
- 🔐 **Protected APIs** — Role-based, per-user access  
- 🧪 **Unit Tested** — Core backend logic tested  
- 🖥️ **Responsive UI** — Smooth frontend built with React

---

## 🛠️ Tech Stack

| Layer        | Technology                |
| ------------ | ------------------------ |
| Backend      | Java (Spring Boot), JWT  |
| Frontend     | React.js, CSS            |
| Database     | PostgreSQL               |
| Build Tools  | Maven, npm               |
| Testing      | JUnit, Mockito           |

---

## 📦 Project Structure

```
SnapLink/
├── url-shortener/            # Spring Boot backend
└── url-shortner-frontend/    # React frontend
```

---

## ⚙️ Database Schema

<details>
<summary>Show SQL Schema</summary>

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

CREATE TABLE refresh_tokens (
  id BIGSERIAL PRIMARY KEY,
  token VARCHAR(255) NOT NULL,
  expiry_date TIMESTAMP NOT NULL,
  user_id BIGINT REFERENCES users(id)
);

CREATE TABLE url_mapping (
  id BIGSERIAL PRIMARY KEY,
  original_url VARCHAR(255) NOT NULL,
  short_url VARCHAR(255) UNIQUE NOT NULL,
  click_count INTEGER DEFAULT 0,
  created_date TIMESTAMP NOT NULL,
  user_id BIGINT REFERENCES users(id)
);

CREATE TABLE click_event (
  id BIGSERIAL PRIMARY KEY,
  click_date TIMESTAMP NOT NULL,
  url_mapping_id BIGINT REFERENCES url_mapping(id)
);

</details>

**ERD Visual Diagram (Simplified):**

[users] ──< [url_mapping] ──< [click_event]
│
└────< [refresh_tokens]


## 🔐 Security and Testing

- **JWT + Refresh Tokens:**  
  Stateless token authentication for secure login, role-based access, refresh endpoints, and logout functionality.
- **Endpoint Protection:**  
  Role-based authorization enforced for all user-specific API endpoints via Spring Security.
- **Unit Testing:**  
  Core backend services and controllers covered with JUnit and Mockito tests ensuring stability and quality.

## 🖥️ Project Structure

SnapLink/
├── url-shortener/ # Spring Boot backend (Java)
├── url-shortner-frontend/ # React frontend (JavaScript/CSS)


## ⚡ Quickstart

### Prerequisites

- Java 8 or higher
- Node.js & npm
- PostgreSQL

### Clone, Build & Run

git clone https://github.com/Vedant634/SnapLink.git
cd SnapLink
```

---

### 🔧 2. Run the Backend (Spring Boot)

```bash
cd url-shortener
mvn clean install
mvn spring-boot:run
```

➡️ Backend will start at: [http://localhost:8080](http://localhost:8080)

---

### 💻 3. Run the Frontend (React)

Open a **new terminal**:

```bash
cd url-shortner-frontend
npm install
npm start
```

➡️ Frontend will launch at: [http://localhost:3000](http://localhost:3000)

---

### 🌐 4. Access the App

- Go to: [http://localhost:3000](http://localhost:3000)  
- Or try the **Live Demo**: [https://magical-macaron-37b9cb.netlify.app](https://magical-macaron-37b9cb.netlify.app)

---

## 🔐 Security & Testing

- ✅ JWT + Refresh Tokens for secure sessions  
- ✅ Spring Security with role-based API protection  
- ✅ Unit tests using JUnit + Mockito for backend services

---

## 📚 API Endpoints

| Endpoint                           | Method | Auth   | Description                            |
|-----------------------------------|--------|--------|----------------------------------------|
| `/api/auth/register`              | POST   | Public | Register a new user                    |
| `/api/auth/login`                 | POST   | Public | Login & get tokens                     |
| `/api/auth/refresh`               | POST   | Public | Refresh access token                   |
| `/api/auth/logout`                | POST   | User   | Logout & invalidate session            |
| `/api/urls/shorten`               | POST   | User   | Create new short URL                   |
| `/api/urls/myurls`                | GET    | User   | Fetch your shortened URLs              |
| `/api/urls/analytics/{shortUrl}` | GET    | User   | Get analytics of a specific short URL  |
| `/api/urls/totalClicks`           | GET    | User   | Get total click count for user         |
| `/{shortUrl}`                     | GET    | Public | Redirect to original URL               |

---

## 🤝 Contributing

- Fork this repo and submit a pull request  
- Report bugs or suggest features via issues  
- Contributions to docs and tests are welcome!

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for full details.

---

**Happy Linking with SnapLink!**  
If you liked it, ⭐ the repo and share your feedback in issues!
