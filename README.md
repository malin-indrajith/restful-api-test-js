
# REST API Testing with Playwright

## Assignment: REST API Testing  
**Author**: Malin Indrajith Amarasinghe  
**Date**: February 3, 2025  

### Description  

This project is a REST API testing suite implemented in JavaScript using Playwright. The test suite automates API testing for the following endpoints:

**Target API**: [https://api.restful-api.dev/objects](https://api.restful-api.dev/objects)

### Test Scenarios Covered  

The test suite consists of the following test cases:

1. **Retrieve all objects (GET)**  
   Fetches all available objects and verifies the response.

2. **Create a new object (POST)**  
   Adds a new object and ensures it was successfully created.

3. **Retrieve a specific object (GET by ID)**  
   Fetches the newly added object and verifies its details.

4. **Update an object (PUT)**  
   Modifies an existing object and validates the update.

5. **Delete an object (DELETE)**  
   Removes an object and confirms successful deletion.

Each test logs the response details (status code, headers, body) and includes assertions to verify the API behaves as expected.

### Project Setup and Execution  

#### Prerequisites  

Ensure the following dependencies are installed before executing the tests:

- Node.js (>= v16 recommended)
- npm (Node Package Manager)
- Playwright

#### Installation Steps  

1. **Clone this repository**:
   ```bash
   git clone https://github.com/malin-indrajith/restful-api-test-js.git
   cd restful-api-test-js
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers (if not already installed)**:
   ```bash
   npx playwright install
   ```

#### Running the Tests  

Execute the test suite using the following command:  
```bash
npx playwright test
```

To run a specific test file:  
```bash
npx playwright test api.test.js
```

#### Logging and Reports  

The console output provides detailed logs, including API responses and assertion results.

### Summary of Test Scenarios  

1. **Retrieve All Objects (GET Request)**  
   - Sends a GET request to fetch all objects.  
   - Verifies the response status code (200 OK).  
   - Checks if the response body contains an array of objects.

2. **Create a New Object (POST Request)**  
   - Sends a POST request with JSON data to create a new object. 
   - Verifies the response status (200 OK) and ensures the object is created.  
   - Stores the newly created object’s ID for further tests.

3. **Retrieve Specific Object (GET by ID Request)**  
   - Uses the ID from the previous test to fetch the newly created object.  
   - Verifies the response data matches the created object.

4. **Update an Object (PUT Request)**  
   - Sends a PUT request to update an object’s properties.  
   - Validates that the response contains updated values.

5. **Delete an Object (DELETE Request)**  
   - Sends a DELETE request using the object ID from the creation test.  
   - Ensures the response confirms successful deletion.

### Best Practices Followed  

- **Assertions**: Ensures API responses contain expected data.
- **Logging**: Provides detailed logs for debugging and validation.
- **Parameterization**: Uses dynamic object IDs to maintain test independence.

### Contact  

For any queries, feel free to reach out via [Mobile](076 542 9999), [WhatsApp](076 541 9999).