export async function albumLoader ({params}) {
    if (typeof params.id === 'undefined') {
        return;
    }
    
    const data = {
        id: params.id,
    };

    return data;
};
