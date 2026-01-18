# 🛒 E-Commerce Web Application (Full-Stack)

A full-stack e-commerce web application with frontend UI, backend REST APIs, user authentication using JWT, and order management.

---

## ✨ Features

- Product listing using REST API
- User login with JWT authentication
- Order creation and order listing
- Secure backend endpoints
- Frontend consumes backend APIs dynamically

---

## 🛠 Tech Stack

### Backend
- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)

### Frontend
- React Native / Typescript / Twalind.css
- REST API integration

---

## 📂 Project Structure

ecommerce-project/
├── backend/
│ ├── manage.py
│ └── requirements.txt
│
├── frontend/
│ ├── package.json
│ └── src/


---

## ⚙️ Backend Setup (Django)

### 1️⃣ Go to backend directory
```bash
cd backend

2️⃣ Create virtual environment

python -m venv env

3️⃣ Activate virtual environment

Windows

env\Scripts\activate

Linux / macOS

source env/bin/activate

4️⃣ Install backend requirements

pip install -r requirements.txt

5️⃣ Run Django server

python manage.py runserver

Backend will be available at:

http://127.0.0.1:8000/

🔐 Authentication (JWT)

    Token generation endpoint:

POST /Ecommerce/token/

    Token refresh endpoint:

POST /Ecommerce/token/refresh/

JWT is used to secure user-specific APIs like orders.
📦 Frontend Setup
1️⃣ Go to frontend directory

cd frontend

2️⃣ Install frontend packages

npm install

📌 All required frontend packages are listed in:

frontend/package.json

3️⃣ Start frontend server

npm start

Frontend will run at:

http://localhost:3000/

🔄 API Endpoints

    Products API

GET /Ecommerce/data/

    Orders API (JWT protected)

GET /Ecommerce/orders/

🎥 Demo

The project demo shows:

    Frontend user flow

    Order creation and listing

    Product data fetched from REST API

    JWT-based authentication

📝 Notes

    This project uses REST APIs for data exchange

    JWT tokens are used for secure authentication

    Sensitive information should not be exposed

👤 Author

Developed by [Sibtain Tariq]

Upload project video for showing example of Ecommerce_App
https://github.com/user-attachments/assets/f30ab871-d411-432c-923b-5cfe4c179cce
