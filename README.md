# BFHL API

A REST API built with **Node.js + Express** as part of the Bajaj Finserv Health Full Stack assignment (VIT, 29 Aug 2025).

---

## 🚀 Hosted URL

The API is live on Render:

https://bfhl-api-pwly.onrender.com/bfhl


⚠️ **Note:** This is a **POST-only** endpoint. If you open it in a browser (GET request), you will see a 404. Use Postman, Thunder Client, or `curl`/PowerShell to test.  
If you open the base URL (`/`), you’ll see a simple health check message:


---

## 📦 Setup (Local Development)

Clone the repository:
```bash
  git clone https://github.com/BrianBobby/bfhl-api.git
  cd bfhl-api
```
Install dependencies:
```bash
npm install
```
Create a .env file (see .env.example) with your own details:
```bash
FULL_NAME=John Doe
DOB=17091999
EMAIL=john@xyz.com
ROLL_NUMBER=ABCD123
PORT=3000
```
Start the server:
```bash
npm start
```
The API will run at:

http://localhost:3000/bfhl

POST /bfhl

Request Body (JSON):
```bash
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```
Response:
```bash
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```
How to Test
▶ Using PowerShell (Windows)
Invoke-RestMethod -Uri "https://bfhl-api-pwly.onrender.com/bfhl" `
  -Method Post `
  -Body '{"data":["a","1","334","4","R","$"]}' `
  -ContentType "application/json" | ConvertTo-Json -Depth 5
