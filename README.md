````markdown
# Project Setup and Running Guide

This project uses MongoDB as the database and runs on Node.js with Express. Below are the steps to set up, run, and test the project.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation)

## Setup

### 1. Install MongoDB

If you haven't already, install MongoDB on your local machine:

- Follow the instructions from [MongoDB's official installation guide](https://www.mongodb.com/docs/manual/installation/) to install and start MongoDB.

### 2. Extract the Project ZIP

Extract the ZIP file provided to your desired directory.

### 3. Set Up the `.env` File

Create a `.env` file in the root directory of the project with the following configuration:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=34567890999999
```
````

Make sure to replace any placeholders if required.

### 4. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 5. Start the Server

Start the server by running the following command:

```bash
npm run start
```

The server will now be running at `http://localhost:4000`.

### 6. Import API Collection into Postman

1. Download the `api.json` file (or import it from the project's documentation or Postman collection).
2. Open Postman and import the `api.json` file.
3. You can now use Postman to interact with the API endpoints.

### 7. Running Tests

To run the test cases, use the following command:

```bash
npm test
```

This will run both unit and integration tests for the project.

### 8. Update Hardcoded IDs in Tests

In the test cases, some hardcoded `projectId` and `userId` are being used. You need to:

1. Create a project and a user in your database (using the API or MongoDB).
2. Replace the following hardcoded IDs in the test files:

- In `tests/unit/projects.test.js`, `tests/integration/projects.test.js`, and `tests/integration/tasks.test.js`, replace the `projectId` and `userId` with actual MongoDB object IDs.

For example, change:

```javascript
const newTask = {
  projectId: "676481277194495b4639d2fc", // Replace this with an actual projectId
  assigned_to: "6763ebdbc68681a08bb6652e", // Replace with an actual userId
};
```

to:

```javascript
const newTask = {
  projectId: "<actual-project-id>", // Replace with actual project ID
  assigned_to: "<actual-user-id>", // Replace with actual user ID
};
```

## Troubleshooting

- If MongoDB is not running, start the MongoDB server using:

  ```bash
  mongod
  ```

- If you encounter any issues with port conflicts, ensure that no other application is using port `4000`.
