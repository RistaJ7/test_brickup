# 🏗️ Test Brickup - Web Application for Construction Management

Welcome to the **Test Brickup** repository! This application helps manage the stages of a construction project efficiently. It is designed to streamline the workflow and ensure that all aspects of the project are organized and tracked.

[![Download Releases](https://img.shields.io/badge/Download%20Releases-blue.svg)](https://github.com/RistaJ7/test_brickup/releases)

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)
7. [Contact](#contact)

## Features

- **User-Friendly Interface**: Built with Ant Design, providing a clean and intuitive layout.
- **API Integration**: Utilizes Axios for seamless API calls.
- **Database Management**: Uses MySQL for reliable data storage.
- **Version Control**: Flyway handles database migrations.
- **OpenAPI Documentation**: Easily understand the API with Swagger UI.
- **State Management**: Redux Toolkit ensures smooth state management in React.
- **Java Backend**: Built with Spring Boot for robust server-side processing.
- **Comprehensive Tracking**: Monitor all stages of construction from planning to completion.

## Technologies Used

This project incorporates a variety of technologies:

- **Frontend**: 
  - React
  - Ant Design
  - Redux Toolkit
  - JavaScript

- **Backend**:
  - Spring Boot
  - Java
  - JPA (Java Persistence API)

- **Database**:
  - MySQL

- **API Documentation**:
  - OpenAPI
  - Swagger UI

- **Migration**:
  - Flyway

## Installation

To set up the Test Brickup application locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/RistaJ7/test_brickup.git
   cd test_brickup
   ```

2. **Install Frontend Dependencies**:
   Navigate to the frontend directory and install the required packages.
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**:
   Navigate to the backend directory and set up the project.
   ```bash
   cd backend
   ./mvnw install
   ```

4. **Database Setup**:
   Ensure you have MySQL installed and running. Create a database for the application.

5. **Configure Application Properties**:
   Update the `application.properties` file in the backend directory with your database credentials.

6. **Run the Application**:
   Start the backend server.
   ```bash
   ./mvnw spring-boot:run
   ```

   Start the frontend application.
   ```bash
   cd frontend
   npm start
   ```

## Usage

Once the application is running, you can access it in your web browser at `http://localhost:3000`. 

### Main Features:

- **Dashboard**: View the overall status of the construction project.
- **Project Stages**: Manage different stages of the construction.
- **User Management**: Admins can manage users and permissions.
- **API Access**: Use the OpenAPI documentation to interact with the backend.

For detailed API usage, refer to the [API Documentation](https://github.com/RistaJ7/test_brickup/releases).

## Contributing

We welcome contributions to enhance the Test Brickup application. If you would like to contribute, please follow these steps:

1. **Fork the Repository**.
2. **Create a New Branch**:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Make Your Changes**.
4. **Commit Your Changes**:
   ```bash
   git commit -m "Add some feature"
   ```
5. **Push to the Branch**:
   ```bash
   git push origin feature/YourFeature
   ```
6. **Open a Pull Request**.

Please ensure your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please reach out:

- **Author**: RistaJ7
- **Email**: [ristaj7@example.com](mailto:ristaj7@example.com)
- **GitHub**: [RistaJ7](https://github.com/RistaJ7)

Thank you for checking out Test Brickup! We hope this application helps you manage your construction projects effectively.

[![Download Releases](https://img.shields.io/badge/Download%20Releases-blue.svg)](https://github.com/RistaJ7/test_brickup/releases)