# BrewApps Node.js Backend Developer Challenge

## Introduction

*This contains the RESTful APIs created using Node.js and Express to manage books.*

## Setup and Installation

To set up and run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/vxvishal/BrewApps.git`
2. Navigate to the project directory: `cd BrewApps`
3. Install the dependencies: `npm install`
4. Start the server: `npm start`

## API Endpoints

- `GET /api/books`: Fetches all books.
- `POST /api/books`: Adds a new book with the title, author and summary provided in the request body.
- `GET /api/books/:id`: Fetches a specific book by its ID.
- `PATCH /api/books/:id`: Updates a specific book by its ID with the fields to be updated provided in the request body.
- `DELETE /api/books/:id`: Deletes a specific book by its ID.

## Decisions and Assumptions

- When adding a new book or updating an existing one, the book details should be provided in the request body rather than the URL. This decision was made for several reasons:
    - **URL Length Limitation**: URLs have a length limitation. If we include too much data in the URL, it might get cut off, especially for complex or lengthy data, in this case the book summary.
    - **Data Privacy**: Data in the URL can be logged in server logs or browser history, or seen by anyone who has access to the URL. By putting data in the request body, we can better protect sensitive information.
    - **Cleaner URLs**: Keeping the data in the request body helps keep our URLs clean and readable, which can make the API easier to use and understand.

    ## Deployment

    The application is deployed at [here](). You can access the API endpoints at this URL.