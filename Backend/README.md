# Spring Boot JWT Authentication Service

A secure Spring Boot application demonstrating JWT (JSON Web Token) authentication with comprehensive security features and OWASP best practices.

## Features

- JWT Authentication
- Spring Security Integration
- Security Headers (OWASP Compliance):
  - XSS Protection
  - Content Security Policy
  - Frame Options (Clickjacking Prevention)
  - Referrer Policy
  - Permissions Policy
- Stateless Session Management
- Global Exception Handling
- Health Check Endpoints

## Prerequisites

- Java 25
- Maven 3.x
- Docker (optional)

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd demo
```

2. Configure application properties:
Edit `src/main/resources/application.properties` to set your JWT secret and user credentials:
```properties
jwt.secret=<your-secret-key>
jwt.expiration=86400000
spring.security.user.name=<your-username>
spring.security.user.password=<your-password>
```

3. Build the project:
```bash
./mvnw clean install
```

4. Run the application:
```bash
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t demo-app .
```

2. Run the container:
```bash
docker run -p 8080:8080 demo-app
```

## API Endpoints

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "admin",
    "password": "password"
}
```

Response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "type": "Bearer"
}
```

### Protected Endpoints

All API endpoints under `/api/**` require authentication. Include the JWT token in the Authorization header:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

### Health Check

- Health Status: `GET /healthz`
- Readiness: `GET /readyz`

## Security Features

### JWT Authentication
- Stateless authentication using JSON Web Tokens
- Token expiration and validation
- Secure token generation with strong encryption

### Security Headers
```properties
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; frame-ancestors 'none'
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(self)
```

### Exception Handling
- Authentication failures (401 Unauthorized)
- Access denied (403 Forbidden)
- Invalid requests (400 Bad Request)
- Server errors (500 Internal Server Error)

## Configuration

Key application properties:

```properties
# Server Configuration
server.port=8080

# JWT Configuration
jwt.secret=your-secret-key
jwt.expiration=86400000

# Security User
spring.security.user.name=admin
spring.security.user.password=password

# File Upload Security
spring.servlet.multipart.max-file-size=50MB
spring.servlet.multipart.max-request-size=50MB
spring.servlet.multipart.file-size-threshold=2KB

# Cookie Security
server.servlet.session.cookie.http-only=true
server.servlet.session.cookie.secure=true
server.servlet.session.timeout=15m
```

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── example/
│   │           └── demo/
│   │               ├── config/
│   │               │   └── SecurityConfig.java
│   │               ├── security/
│   │               │   ├── CustomUserDetailsService.java
│   │               │   ├── JwtAuthenticationFilter.java
│   │               │   └── JwtTokenProvider.java
│   │               ├── controller/
│   │               └── DemoApplication.java
│   └── resources/
│       └── application.properties
└── test/
    └── java/
```