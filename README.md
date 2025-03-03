# Library App Frontend

This repository contains the **frontend** for the Library App, built with **React.js**.

## Features

- User-friendly UI for managing books and users
- Integration with backend API
- Borrowing & returning books functionality
- Environment-based API setup (local/remote)

## Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16.x recommended)

---

## Frontend Setup

###  Using ZIP File

#### 1. Extract the ZIP File
- Download and extract the provided ZIP file.
- Navigate into the extracted folder.

```sh
cd library-app-web
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure the Environment Variables

#### For Local Development
```sh
REACT_APP_API_URL=http://localhost:3000
```

#### For Remote Production
```sh
REACT_APP_API_URL=https://library-app-backend-gray.vercel.app
```

Create a `.env` file in the root directory and paste the appropriate configuration.

### 4. Start the Frontend Server

#### Development Mode
```sh
npm start
```

#### Production Build
```sh
npm run build
```

---

## License
This project is licensed under the MIT License.

## Contact
For issues or suggestions, reach out via GitHub or email.

