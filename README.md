Decision Engine API

A smart decision-making backend system that evaluates multiple options based on user-defined inputs like time, energy, and priority — and returns the most optimal choice.

Overview

The Decision Engine API is built using Django Rest Framework to simulate human-like decision making.

Instead of randomly picking choices, it:

Assigns weights to options
Considers user context (energy, time, priority)
Calculates scores intelligently
Returns the best possible decision

Tech Stack
Backend: Django, Django REST Framework
Database: SQLite (default)
Language: Python

Features
Create decisions with multiple options
Assign attributes to each option:
Time required
Energy level
Priority category
Smart evaluation algorithm
Dynamic scoring system
RESTful API endpoints

How It Works (Core Logic)

The engine evaluates options using:

Normalization of weights
Priority similarity mapping
Context-based scoring

Example factors:

User energy vs required energy
Time available vs required time
Priority alignment

Final score = weighted combination of all factors.

🔗 API Endpoints
Create Decision
    POST /api/decisions/
Get All Decisions
    GET /api/decisions/
Add Options
    POST /api/options/
Evaluate Decision
    POST /api/decisions/{id}/evaluate/

Request Body Example:

{
  "energy": 5,
  "time_available": 4,
  "priority": "career"
}

Response Example:

{
  "best_option": "Study Django",
  "score": 8.7
}
🛠️ Installation
git clone https://github.com/yourusername/decision-engine.git
cd decision-engine
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
▶️ Run Server
python manage.py migrate
python manage.py runserver

If enabled:

POST /api/token/
📌 Use Cases
Daily decision making
Productivity apps
Task prioritization systems

🧪 Future Improvements
AI-based recommendation systems
Machine learning-based scoring
User behavior tracking
Frontend dashboard
Real-time recommendations
Mobile app integration
👨‍💻 Author

Nishad M T
Python Full Stack Developer

📄 License

This project is open-source and available under the MIT License.
