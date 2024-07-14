# Documentation Website Project

## Project Overview

This project is a documentation website built using Django for the backend and React for the frontend. The site allows users to create, edit, and view hierarchical documents, with each document capable of containing other documents. The application is styled using a soothing color palette and provides a clean, user-friendly interface.

## Features

- **User Authentication**: Secure login and logout functionality.
- **Document Management**: Create, edit, and view documents. Each document can contain other documents, allowing for a hierarchical structure.
- **Dynamic Sidebar**: A sidebar that lists all documents and allows for easy navigation. Documents can be expanded to show nested documents.
- **REST API**: Backend API built with Django REST Framework to handle CRUD operations.
- **Responsive Design**: The application is styled to be responsive and user-friendly.
- **Dockerized Setup**: Both backend and frontend are containerized using Docker for easy deployment and development.

## Tech Stack

### Backend
- **Django**: Web framework for building the backend.
- **Django REST Framework**: For building the REST API.
- **PostgreSQL**: Database for storing application data.
- **Gunicorn**: WSGI HTTP server for deploying the Django application.
- **Nginx**: Reverse proxy server.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React component library for UI design.
- **Axios**: Promise-based HTTP client for making API requests.

### Development and Deployment
- **Docker**: Containerization of both backend and frontend applications.
- **Docker Compose**: Tool for defining and running multi-container Docker applications.
- **GitHub Actions**: CI/CD pipeline for automated testing and deployment.

## Project Structure

```
documentation_website/
│
├── backend/
│   ├── main/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   ├── docs/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   ├── tests/
│   │   │   ├── test_models.py
│   │   │   ├── test_serializers.py
│   │   │   └── test_views.py
│   │   └── migrations/
│   │       ├── __init__.py
│   │       ├── 0001_initial.py
│   │       └── ...
│   ├── manage.py
│   ├── Dockerfile
│   ├── conftest.py
│   ├── gunicorn.conf.py
│   ├── pytest.ini
│   ├── .dockerignore
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.js
│   │   │   └── documents.js
│   │   ├── components/
│   │   │   ├── NavBar.js
│   │   │   ├── DocumentDetail.js
│   │   │   ├── DocumentForm.js
│   │   │   ├── DocumentList.js
│   │   │   ├── NavBar.js
│   │   │   └── Sidebar.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── NewDocument.js
│   │   │   ├── EditDocument.js
│   │   │   └── DocumentDetailPage.js
│   │   ├── styles/
│   │   │   ├── NavBar.css
│   │   │   ├── DocumentDetail.css
│   │   │   ├── DocumentForm.css
│   │   │   ├── Sidebar.css
│   │   │   └── global.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   └── ...
│
├── .env
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── README.md
└── ...
```

## Setup and Installation

### Prerequisites

- Docker
- Docker Compose
- Node.js and npm

### Project Setup

1. Create a `.env` file in the root directory and add the necessary environment variables:
   ```sh
   touch .env
   ```

2. Build and run the project using Docker Compose:
   ```sh
   docker-compose -f docker-compose.dev.yml up --build
   ```


## Running Tests

### Backend Tests

1. Navigate to the backend directory (on running container):
   ```sh
   cd backend
   ```

2. Run the tests using pytest:
   ```sh
   pytest
   ```

### Frontend Tests

(Currently disabled in CI/CD pipeline)

## Deployment

To deploy the project in a production environment, use the `docker-compose.prod.yml` file.

1. Build and run the containers:
   ```sh
   docker-compose -f docker-compose.prod.yml up --build
   ```

2. The application will be available at `http://localhost`.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [toygar.aksoy@gmail.com].
