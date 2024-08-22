import { writable } from "svelte/store";
const envAPI = import.meta.env.VITE_API_GOBLIN_LOCAL;
let data = writable([]);
export const getApi = async (url) => {
    try {
        // const response = await fetch(`${envAPI}/${url}`);
        const response = await fetch(`${envAPI}/${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MDEzMzg5LCJpYXQiOjE3MTgwMTMwODksImp0aSI6IjYzMmVjNDM3MjRjZjQwNGQ4ZGQxZjUwY2E2NjRlNWY1IiwidXNlcl9pZCI6MX0.KUtMASQfMiuWsOW5L8kfbNN---DpnqiVFyTCxe74z48'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        console.log(responseData);
        data.set(responseData); // Update the data store with the fetched data
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export async function postTokenRequest() {
    try {
        const response = await fetch('http://localhost:8008/api/user/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": "salman",
                "password": "1234"
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];
    }
}

// Fetch Data
export async function _fetch_expDownload_Data() {
    try {
        // Get access token from local storage
        const access_token = window.localStorage.getItem('access_token');
        // Fetch data from the API
        // const response = await fetch(`${envAPI}/api/get-all-exp-download/`);
        const response = await fetch(`${envAPI}/api/get-all-exp-download/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Parse the response data as JSON
        const responseData = await response.json();
        console.log(responseData);
        // Return the fetched data
        return responseData;
    } catch (error) {
        // Log and handle any errors
        console.error('There has been a problem with your fetch operation:', error);
        return [];
    }
}


export async function _fetch_expIssuance_Data(url) {
    console.log(url);
    try {
        // Get access token from local storage
        const access_token = window.localStorage.getItem('access_token');
        // Fetch data from the API
        // const response = await fetch(`${envAPI}/api/get-all-exp-download/`);
        const response = await fetch(`${envAPI}/${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Parse the response data as JSON
        const responseData = await response.json();
        console.log(responseData);
        // Return the fetched data
        return responseData;
    } catch (error) {
        // Log and handle any errors
        console.error('There has been a problem with your fetch operation:', error);
        return [];
    }
}

// export async function _fetch_expIssuance_Data() {
//     try {
//         // Fetch data from the API
//         const response = await fetch(`${envAPI}/api/get-all-exp-issuance/`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         // Parse the response data as JSON
//         const responseData = await response.json();
//         console.log(responseData);
//         // Return the fetched data
//         return responseData;
//     } catch (error) {
//         // Log and handle any errors
//         console.error('There has been a problem with your fetch operation:', error);
//         return [];
//     }
// }
