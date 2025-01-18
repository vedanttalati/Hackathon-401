# 401_hackathon
1. Clone the repo


2. Backend Setup:
Go into backend folder, create/activate a virtual environment, install requirements, run migrations, then start the server:
- cd backend
- python -m venv venv
- source venv/bin/activate     # On Windows: venv\Scripts\activate
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py runserver

3. Frontend:
In a new terminal, cd into frontend, install dependencies, then start the dev server:
- cd frontend
- npm install
- npm start


Access React at http://localhost:3000 and Django at http://127.0.0.1:8000