# News Center Frontend

MyNewsApp is a web application built using React.js and styled with Bootstrap that allows users to customize their news preferences and view
personalized news articles based on their preferences. Users can select their preferred categories, authors, and sources
to receive tailored news content.

## Features

- User authentication: Users can create an account, log in, and log out.
- News preferences: Users can select their preferred news categories, authors, and sources.
- Personalized news feed: Users receive a customized news feed based on their selected preferences.
- Search functionality: Users can search for specific articles by keyword.

## Prerequisites

To run this project, you need to have the following software installed:

- Node.js
- npm (Node Package Manager)
- Docker (optional, if you want to run the application using Docker)

## Getting Started

1. Clone the repository:

   ```shell
   git clone [repository-url]
2. Navigate to the project directory:

    ```shell
   cd MyNewsApp

3. Install dependencies:
    ```shell
   npm install

# Usage

Running with Node.js
To start the application using Node.js, run the following command:

  ```shell
   npm install
  ```

The application will be accessible at http://localhost:3000.

# Running with Docker

To run the application using Docker, make sure you have Docker installed on your machine. Then, follow these steps:

Build the Docker image:

```shell
docker build -t mynewsapp .
```
then Run the Docker container:
```shell
docker run -p 3000:3000 mynewsapp
```