# DBS Practical

## Setup

1. Clone this repository

2. Create a .env file with the following content

    ```
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_DATABASE=
    DB_CONNECTION_LIMIT=1
    PORT=3000

JWT_SECRET_KEY=your-secret-key
JWT_EXPIRES_IN=1d
JWT_ALGORITHM=HS256

    ```

3. Update the .env content with your database credentials accordingly.

4. Install dependencies by running `npm install`

5. Start the app by running `npm start`. Alternatively to use hot reload, start the app by running `npm run dev`.

6. You should see `App listening on port 3000`

8. (Optional) install the plugins recommended in `.vscode/extensions.json`

## Instructions

Open the page, `http://localhost:3000`, replace the port number accordingly if you app is not listening to port 3000



Create Review
To submit a new review, users can choose from their past orders displayed in a table format (including columns like name, description, image, unit price, quantity, country, order ID, order DateTime, order status, and a "Create Review" button). They can provide details for the review such as product ID, rating, and optional review text.

Retrieve All My Reviews
Users can access and manage all reviews they have previously submitted. This includes the ability to update or delete their reviews as needed.


You can explore other features by yourself , thankyou.