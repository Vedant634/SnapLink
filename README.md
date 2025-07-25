# 🚀 SnapLink — Modern URL Shortener & Analytics Platform

> **Live Demo:**  
> 👉 [https://magical-macaron-37b9cb.netlify.app/](https://magical-macaron-37b9cb.netlify.app/)

SnapLink makes it easy to create short, secure URLs, manage your links, and analyze your click traffic—all in a clean, modern web app.

## ✨ Features

- 🔑 **JWT Auth with Refresh Tokens**  
  Secure login, role-based access, and seamless session renewal.
- 🔗 **Shorten & Share Links**  
  Instantly create memorable, user-specific short links.
- 📊 **Track Your Links**  
  Visual analytics: see clicks, history, and trends per link.
- 🔐 **Protected APIs**  
  Only see and edit your own links.
- 🧪 **Unit Tested**  
  Core backend logic covered with unit tests for reliability.
- 🖥️ **Frontend Experience**  
  Intuitive, responsive UI for frictionless usage ([see live demo](https://magical-macaron-37b9cb.netlify.app/)).

## 🗂️ API Endpoints

| Endpoint                              | Method | Auth      | Description                              |
|-------------------------------------|:------:|:---------:|----------------------------------------|
| `/api/auth/register`                 | POST   | Public    | Register new user                       |
| `/api/auth/login`                    | POST   | Public    | Login and receive JWT/refresh tokens   |
| `/api/auth/refresh`                  | POST   | Public    | Refresh access token with refresh token|
| `/api/auth/logout`                   | POST   | User      | Logout, invalidate session              |
| `/api/urls/shorten`                  | POST   | User      | Shorten a new original URL              |
| `/api/urls/myurls`                   | GET    | User      | List all your shortened URLs            |
| `/api/urls/analytics/{shortUrl}`    | GET    | User      | View click analytics for a short URL    |
| `/api/urls/totalClicks`              | GET    | User      | Aggregate clicks for user’s URLs        |
| `/{shortUrl}`                       | GET    | Public    | Redirect to the original URL            |

## 🛠️ Tech Stack

| Layer        | Technology                |
| ------------ | ------------------------ |
| Backend      | Java (Spring Boot), JWT  |
| Frontend     | React.js, CSS            |
| Database     | PostgreSQL               |
| Build Tools  | Maven, npm               |
| Testing      | JUnit, Mockito (Java)    |

## ⚙️ Database Schema

<details>
<details>
 <summary><b>Show SQL Schema</b></summary>

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

+--------+           +-------------+            +-------------+
| users  |<---+   +--| url_mapping |<---+    +--| click_event |
+--------+    |   |  +-------------+    |    |  +-------------+
              |   |                   |    |          
              |   +---------------------+  |         
              |                          |         
              v                          v         
         +----------------------+   +-------------------+
         |   refresh_tokens     |   |   (more tables)   |
         +----------------------+   +-------------------+



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

cd url-shortener
mvn clean install
mvn spring-boot:run

cd ../url-shortner-frontend
npm install
npm start


1. Open your browser at [`http://localhost:3000`](http://localhost:3000) or [use the live demo](https://magical-macaron-37b9cb.netlify.app/).
2. Register, login, and start shortening URLs instantly!

## 👩‍💻 Contributing

- Fork the repository and submit pull requests.
- Open issues for bugs or feature requests.
- Contributions to documentation and tests are also appreciated.

## 📃 License

This project is licensed under the MIT License.

---

**Happy linking with SnapLink!**  
For questions or help, check the repo or reach out in the issue tracker.

---

