/**  
 * Assignment: REST API Testing with Playwright  
 * Author: Malin Indrajith Amarasinghe  
 * Date: February 3, 2025  
 *  
 * Description:  
 * This script is implemented in JavaScript and automates the testing of a REST API using Playwright
 * The targeted API is: 'https://api.restful-api.dev/objects'.  
 *  
 * The test suite covers the following scenarios:  
 *  
 * Test Scenario_01: Retrieve all objects (GET) - Fetches all objects and verifies the response.  
 * Test Scenario_02: Create a new object (POST) - Adds a new object and ensures it was successfully created.  
 * Test Scenario_03: Retrieve a specific object (GET by ID) - Fetches the newly added object and checks its details.  
 * Test Scenario_04: Update an object (PUT) - Modifies an existing object and validates the update.  
 * Test Scenario-05: Delete an object (DELETE) - Removes an object and confirms successful deletion.  
 *  
 * Response details were logged for each test, including status codes and data.  
 * Assertions ensure the API behaves as expected and mark the test as passed at the end of each test.  
 */

// Import Playwright's test and expect functions for API testing
const { test, expect } = require('@playwright/test');

// Define the base URL for the API under test
const BASE_URL = 'https://api.restful-api.dev/objects';

// Define a test suite for REST API testing with Playwright
test.describe('REST API Testing with Playwright', () => {
  
        // Test Scenario_1: Get list of all objects
        test('Get list of all objects', async ({ request }) => {
        const response = await request.get(BASE_URL);
    
        // Verify if the response status code is 200
        expect(response.status()).toBe(200); 
        console.log('-----------------------------------------');

        // Log the response details (status code, hearders, body)
        console.log('Response Status:', response.status(),'\n');
        console.log('Response Headers:', response.headers(),'\n');
        console.log('Response Body:', await response.text(),'\n');
        console.log('-----------------------------------------');

        // Get the response body as JSON
        const responseBody = await response.json();

        // Validate the response body is an array of objects (13 objects)
        expect(Array.isArray(responseBody)).toBeTruthy();
        const arrayCount = responseBody.length;
        console.log('\nArray Count:', arrayCount, '\n');

        // Validate the number of objects in the array 
        expect(arrayCount).toBe(13);

        // Log the response body for reference
        console.log('Response Body (Array):', JSON.stringify(responseBody, null, 2,));
        console.log('-----------------------------------------');

        // If all assertions pass, print the success message
        console.log('\n Test Scenario_01: Pass \n');
        console.log('-----------------------------------------');
        });

        // Test Scenario_2: Add an object using POST
        // Declare a variable to store the ID of the created object
        let createdId; 
    
        // Verifies the object can be successfully created via a POST request
        test('Add an object using POST', async ({ request }) => {
        // Define the object to be created
        const newObject = { 
            name: 'Apple MacBook Pro 16_New',  
            data: { 
                year: 2025,  
                price: 3000.50,  
                "CPU model": "Intel Core i9",  
                "Hard disk size": "2 TB" 
                }  
            };

        // Send a POST request to create the object
        const response = await request.post('https://api.restful-api.dev/objects', {
            data: newObject,
        });
        
        // Verify the response status code is 200
        expect(response.status()).toBe(200);
        console.log('Response Status:', response.status(),'\n');
        console.log('-----------------------------------------');

        // Log the response body for reference
        const responseData = await response.json();
        console.log('API Response:', responseData,); 
        console.log('-----------------------------------------');
        
        // Va;idate the response data matches the created object
        createdId = responseData.id;
        expect(responseData).toHaveProperty('name', newObject.name);
    
        // Ensure the data fields are present in the response
        expect(responseData).toHaveProperty('data');
    
        if (responseData.data) {
        // Validate the fields in the response
        expect(responseData.data).toHaveProperty('year', newObject.data.year);
        expect(responseData.data).toHaveProperty('price', newObject.data.price);
        expect(responseData.data).toHaveProperty('CPU model', newObject.data["CPU model"]);
        expect(responseData.data).toHaveProperty('Hard disk size', newObject.data["Hard disk size"]);
        
        // Log the data field for reference
        console.log('Data fields exist in response:', JSON.stringify(responseData.data, null, 2,'\n'));
        } else {
        // Log a warning if the data field is missing
        console.warn('Warning: "data" field is missing in API response.','\n');
        }
        console.log('-----------------------------------------');

        // If all assertions pass, print the success message
        console.log('\n Test Scenario_02: Pass \n');
        console.log('-----------------------------------------');
        });

        // Test Scenario_3: Get a single object using the above added ID
        test('Get a single object using the added ID', async ({ request }) => {
            const response = await request.get(`${BASE_URL}/${createdId}`);
    
        //  Verify the response status code is 200
        expect(response.status()).toBe(200); 
        console.log('-----------------------------------------');
        
        // Log the response details (status code & body)
        console.log('Response Status:', response.status(),'\n');
        console.log('Response Body:', await response.text(),'\n');
        console.log('-----------------------------------------');
    
        // Get the response body as JSON
        const responseData = await response.json();

        // Validate the response data matches the created object
        if (
        responseData.id === createdId &&
        responseData.name === 'Apple MacBook Pro 16_New' &&
        responseData.data.year === 2025 &&
        responseData.data.price === 3000.50 &&
        responseData.data["CPU model"] === "Intel Core i9" &&
        responseData.data["Hard disk size"] === "2 TB"
        ) {
            console.log('All data matches with the previously created object in test scenario_02!');
        } else {
            console.log('Data mismatch or missing fields.');
        }
        console.log('-----------------------------------------');

        // If all assertions pass, print the success message
        console.log('\n Test Scenario_03: Pass \n');
        console.log('-----------------------------------------');
        });

        // Test Scenario_4: Update the object added in test scenario_02
        test('Update the object using PUT', async ({ request }) => {
            const updatedObject = {
                name: 'Apple MacBook Pro 16_New Updated',  // Updated name
                data: { 
                    year: 2025,  
                    price: 3500.00,  // Updated price
                    "CPU model": "Intel Core i9",  
                    "Hard disk size": "4 TB" // Updated hard disk size
                }
            };
        
        // Send a PUT request to update the object using the ID 14
        const response = await request.put(`${BASE_URL}/ff808181932badb60194cca874214129`, {
            data: updatedObject,
        });
    
        // Verify the response status code is 200
        expect(response.status()).toBe(200);
        console.log('Response Status:', response.status(),'\n');
        console.log('-----------------------------------------');
    
        // Log the response body for reference
        const responseData = await response.json();
        console.log('API Response:', responseData);
        console.log('-----------------------------------------');
        
        // Validate the response data matches the updated object
        if (
            responseData.name === updatedObject.name &&
            responseData.data.year === updatedObject.data.year &&
            responseData.data.price === updatedObject.data.price &&
            responseData.data["CPU model"] === updatedObject.data["CPU model"] &&
            responseData.data["Hard disk size"] === updatedObject.data["Hard disk size"]
        ) {
            console.log('Object successfully updated!');
        } else {
            console.log('Update failed.');
        }
        console.log('-----------------------------------------');
    
        // If all assertions pass, print the success message
        console.log('\n Test Scenario_04: Pass \n');
        console.log('-----------------------------------------');
        });

        // Test Scenario_5: Delete the object added in test scenario_02
        test('Delete the object using DELETE', async ({ request }) => {
        // Send a DELETE request to delete the object using the created ID from Scenario_02
        const response = await request.delete(`${BASE_URL}/${createdId}`);
        
        // Verify the response status code is 200 (Successful deletion)
        expect(response.status()).toBe(200);
        console.log('Response Status:', response.status(), '\n');
        console.log('-----------------------------------------');
        
        // Log the response body for reference
        const responseData = await response.json();
        console.log('API Response:', responseData);
        console.log('-----------------------------------------');

        // Validate the response message contains the word 'deleted'
        expect(responseData.message).toContain('deleted');
        
        // If all assertions pass, print the success message
        console.log('\n Test Scenario_05: Pass \n');
        console.log('-----------------------------------------');
        });      
});
