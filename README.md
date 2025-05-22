## API Endpoints Documentation

This backend provides authentication and AI endpoints. Below you'll find details on each endpoint, including required request bodies and expected responses.

---

### Authentication

#### `POST /auth/register`

Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```
- `email`: string, required, must be a valid email.
- `password`: string, required, must be strong (min 8 chars, uppercase, lowercase, number, symbol).

**Responses:**
- `201 Created`  
  ```json
  { "status": 201, "message": "User registered successfully" }
  ```
- `409 Conflict`  
  ```json
  { "status": 409, "message": "User already exists" }
  ```
- `500 Internal Server Error`  
  ```json
  { "status": 500, "message": "Error during registration" }
  ```

---

#### `POST /auth/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}
```

**Responses:**
- `200 OK`  
  ```json
  { "status": 200, "message": "User logged in successfully", "token": "<JWT_TOKEN>" }
  ```
- `401 Unauthorized`  
  ```json
  { "status": 401, "message": "Invalid email or password" }
  ```
- `500 Internal Server Error`  
  ```json
  { "status": 500, "message": "Error during login" }
  ```

---

### AI Endpoints

#### `POST /ai/initialize`

Initialize the AI model with a context (system instruction).

**Request Body:**
```json
{
  "context": "You are a helpful assistant."
}
```
- `context`: string, required.

**Responses:**
- `200 OK`  
  ```json
  { "message": "AI model initialized successfully" }
  ```
- `500 Internal Server Error`  
  ```json
  { "message": "Failed to initialize AI model" }
  ```

---

#### `POST /ai/prompt`

Send a prompt to the AI model and get a response.  
**Requires Authorization header with Bearer token.**

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body:**
```json
{
  "prompt": "What is the weather today?"
}
```
- `prompt`: string, required.

**Responses:**
- `200 OK`  
  Returns the AI model's response (structure depends on the AI provider).
- `401 Unauthorized`  
  If token is missing or invalid.
- `500 Internal Server Error`  
  ```json
  { "message": "Failed to get prompt from AI model" }
  ```

---

### Notes

- All endpoints expect and return JSON.
- Register and login endpoints do not require authentication.
- `/ai/prompt` requires a valid JWT token from `/auth/login` in the `Authorization` header.
- Passwords must be strong (see validation rules in the backend).

---

For further details, see the implementation in:
- [`AuthController`](src/auth/auth.controller.ts)
- [`AiController`](src/ai/ai.controller.ts)