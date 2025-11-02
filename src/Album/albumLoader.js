export async function albumLoader ({params, request}) {

    if (typeof params.id === 'undefined') {
        return;
    }
    
    // we can do this or on a 404 set the create flag, or redirect to a create album page
    const url = new URL(request.url);
    const create = url.searchParams.get('create');

    // probably should pass the album name, or have it in the payload
    const data = {
        id: params.id,
        newAlbum: create === 'true', // this stuff is probably me overengineering a bit
        images: create ? [] : [
            {
                albumId: 1,
                id: 1,
                title: "accusamus beatae ad facilis cum similique qui sunt",
                url: "https://via.placeholder.com/600/92c952",
                thumbnailUrl: "https://via.placeholder.com/150/92c952",
            },
            {
                albumId: 1,
                id: 2,
                title: "reprehenderit est deserunt velit ipsam",
                url: "https://via.placeholder.com/600/771796",
                thumbnailUrl: "https://via.placeholder.com/150/771796",
            },
            {
                albumId: 1,
                id: 3,
                title: "officia porro iure quia iusto qui ipsa ut modi",
                url: "https://via.placeholder.com/600/24f355",
                thumbnailUrl: "https://via.placeholder.com/150/24f355",
            },
            {
                albumId: 1,
                id: 4,
                title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
                url: "https://via.placeholder.com/600/d32776",
                thumbnailUrl: "https://via.placeholder.com/150/d32776",
            },
            {
                albumId: 1,
                id: 5,
                title: "natus nisi omnis corporis facere molestiae rerum in",
                url: "https://via.placeholder.com/600/f66b97",
                thumbnailUrl: "https://via.placeholder.com/150/f66b97",
            },
            {
                albumId: 1,
                id: 6,
                title: "accusamus ea aliquid et amet sequi nemo",
                url: "https://via.placeholder.com/600/56a8c2",
                thumbnailUrl: "https://via.placeholder.com/150/56a8c2",
            },
        ]
    };

    return data;
};
