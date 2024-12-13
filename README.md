# Getting Started

This is a Node.js application that can be run using Docker. Follow these steps to get started:

## Prerequisites

* Docker installed on your system
* Docker Compose installed on your system
* Git installed on your system

## Running the Application

### Step 1: Clone the Repository

 Clone the repository using the following command:

```bash
git clone https://github.com/AstroArbaaz/Task1.git
```

### Step 2: Start Docker Daemon

Make sure the Docker daemon is running on your system. If it's not running, start it using the following command:

* On Linux: `sudo systemctl start docker`
* On macOS (using Docker Desktop): Open Docker Desktop and make sure it's running
* On Windows (using Docker Desktop): Open Docker Desktop and make sure it's running

### Step 3: Build and Run the Container

Navigate to the cloned repository directory and run the following command to build and start the container:

```bash
docker-compose up --build -d
```

This command will build the Docker image and start the container in detached mode.

### Verify the Application

Once the container is running, you can verify that the application is working by accessing it through your web browser or using a tool like `curl`.

## Stopping the Container

To stop the container, run the following command:

```bash
docker-compose down
```

This command will stop and remove the container.

## Testing the API

A Postman collection file is provided to test the API. To use it, follow these steps:

### Step 1: Import the Postman Collection
Open Postman and click on the "Import" button. Select the "Postman Collection" file from the repository directory.

### Step 2: Send the Request
Once the collection is imported, navigate to the "Get User Details" request and click on the "Send" button. This will send a GET request to the API to retrieve user details.

### Verify the Response
Verify that the API returns the expected response. You can check the response status code, headers, and body to ensure that the API is working correctly.