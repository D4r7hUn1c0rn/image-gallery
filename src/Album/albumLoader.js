import axios from 'axios';

export async function albumLoader ({params, request}) {

    if (typeof params.id === 'undefined') {
        return;
    }
    
    // we can do this or on a 404 set the create flag, or redirect to a create album page
    const url = new URL(request.url);
    const create = url.searchParams.get('create');
    if (create === 'true') {
        return {
            id: params.id,
            newAlbum: 'true', // this stuff is probably me overengineering a bit
            images: []
        };
    }

    // probably should pass the album name, or have it in the payload
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos?albumId=' + params.id);

        return {
            id: params.id,
            newAlbum: false,
            images: response.data
        };

    } catch (error) {
        console.error('Error fetching images:', error);

        // Return fallback data in case of error
        return {
            images: []
        };
    }
};
