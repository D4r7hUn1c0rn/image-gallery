import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function Album() {
  const { id, images, newAlbum } = useLoaderData();

  const [image, setImage] = useState();

  return (
    <>
      <h1>{id}</h1>
      {image ? (
        <div data-testid="image-modal" onClick={() => setImage(undefined)} style={{position: 'fixed', top: 0, bottom:0, right:0, left:0, textAlign: 'center', paddingTop: '50px', border: '1px solid black', backgroundColor: 'white'}}>
          <img src={image.url} alt={image.title} />
          <p>{image.title}</p>
        </div>
      ) : (
        <></> 
      )}
      {images.length === 0  ? (  // just in case there's already an album but it has no images
        <div>
          <h2>There are no images in this album</h2>
          <p>This is where the album creation component would go, file upload, text input, patch to album record.</p>
          {newAlbum ?
            (<button onClick={() => alert('Album created!')}>Create Album</button>) // POST new album and array of images to backend
          :
            (<button onClick={() => alert('Album saved!')}>Update Album</button>) /* UPDATE existing album and array of images to backend */}
        </div>
      ) : (
        <ul>
          {images.map((image, i) => {
            return (
              <li key={i} onClick={() => setImage(image)}>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src={image.thumbnailUrl}
                  alt={image.title}
                />
                <p>{image.title}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
