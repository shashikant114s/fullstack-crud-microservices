# SuperHero CRUD Demo (Fullstack with Docker)
Full-stack CRUD application using **.NET 8 Web API**, **React frontend**, **SQL Server**, and **Nginx reverse proxy**, containerized with Docker and orchestrated with Docker Compose to demonstrate microservices architecture.



---

## 🚀 Services Overview

- **SQL Server** → Stores superhero data
- **WebAPI (.NET 8)** → Provides CRUD endpoints (`/api/SuperHero`)
- **Frontend (React + Vite)** → UI for CRUD operations
- **Nginx** → Acts as a reverse proxy for React and API

---

## 🏗️ How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/shashikant114s/fullstack-crud-microservices.git
   cd fullstack-crud-microservices
   ```
2. Build and run with Docker Compose:

   ```bash
   docker compose up -d --build
   ```
3. Access the app in your browser:

   ```bash
   http://<EC2-PUBLIC-IP>
   ```

## 🔧 Configuration: Public IP Issue

Since your EC2 public IP changes after every restart, you need to update the React build argument in `docker-compose.yaml`.

In `docker-compose.yaml`:

```yaml
frontend:
  build:
    context: ./react-app
    dockerfile: Dockerfile
    args:
      - VITE_API_BASE_URL=http://<EC2-PUBLIC-IP>
```
**Example:**

```yaml
    args:
      - VITE_API_BASE_URL=http://13.233.44.22
```

**Rebuild and restart the containers:**

```bash
docker compose up -d --build
```

## 🔍 Endpoints

 - Frontend (React) → `http://<EC2-IP>/`
 - API (WebAPI) → `http://<EC2-IP>/api/SuperHero`
 - Swagger → `http://<EC2-IP>/swagger/index.html`

## 🛠️ Development Notes

- SQL Server data is persisted using a Docker volume `sql_data`
- If you want a permanent public IP, assign an Elastic IP in AWS and replace it once. Then you don’t need to edit `docker-compose.yaml` again.
- For production, using a domain name (e.g., `api.myapp.com`) mapped to Elastic IP is recommended.
