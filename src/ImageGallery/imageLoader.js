import axios from 'axios';

export async function imageLoader ({params}) {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');

        return {
            albums: response.data
        };
    } catch (error) {
        console.error('Error fetching albums:', error);

        // Return fallback data in case of error
        return {
            albums: []
        };
    }
};
