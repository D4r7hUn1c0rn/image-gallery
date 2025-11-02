import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AddImage from "./AddImage";

export default function Album() {
  const { id, images, newAlbum } = useLoaderData();

  const [image, setImage] = useState();

  return (
    <>
      <h1><a href="/" aria-label="back to albums">&lt;</a> Album {id}</h1>
      {image ? (
        <div className="image-modal" data-testid="image-modal" onClick={() => setImage(undefined)} style={{position: 'fixed', top: 0, bottom:0, right:0, left:0, textAlign: 'center', paddingTop: '10%', backgroundColor: 'white', opacity: 0.95}}>
          {/* <img style={{ minHeight: "60%", maxHeight: "80%", width: "auto" }} src={image.url} alt={image.title} /> */}
          <img style={{ minHeight: "60%", maxHeight: "80%", width: "auto" }} src="/cow.jpeg" alt={image.title} />
          <p style={{ minHeight: "100px", padding: "10px", maxWidth: "50%", margin: "10px auto" }}>{image.title}</p>
        </div>
      ) : (
        <></> 
      )}  
      {images.length > 0  ? (
        <ul className="album-images" style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0, border: 'none', width: '100%' }}>
          {images.map((image, i) => {
            return (
              <li key={i} onClick={() => setImage(image)} style={{width: '180px', margin: '10px', cursor: 'pointer', border: '1px solid #e3e3e3', borderRadius: '4px'}}>
                <img
                  style={{ minWidth: "180px", maxWidth: "180px", minHeight: "180px", maxHeight: "180px", borderTopLeftRadius: '4px', borderTopRightRadius: '4px', backgroundColor: '#777', color: '#fff' }}
                  src={image.thumbnailUrl}
                  alt={image.title}
                />
                <p style={{ minHeight: "100px", padding: '10px' }}>{image.title}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <h2>There are no images in this album</h2>
        </div>
      )}
      <AddImage albumId={id} imageIndex={images.length++} createNewAlbum={newAlbum} />
    </>
  );
}

/*
<p>This is where the album creation component would go, file upload, text input, patch to album record.</p>
          {newAlbum ?
            (<button onClick={() => alert('Album create handling here!')}>Create Album</button>) // POST new album and array of images to backend
          :
            (<button onClick={() => alert('Album image uploading here!')}>Update Album</button>) /* UPDATE existing album and array of images to backend */
