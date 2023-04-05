import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function Album() {
  const { id } = useLoaderData();

  const [image, setImage] = useState();
  const [images] = useState([
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
  ]);

  return (
    <>
      {image ? (
        <div onClick={() => setImage(undefined)} style={{position: 'fixed', top: 0, bottom:0, right:0, left:0, textAlign: 'center', paddingTop: '50px'}}>
          <img src={image.url} />
        </div>
      ) : (
        <></>
      )}
      <ul>
        {images.map((image) => {
          return (
            <li onClick={() => setImage(image)}>
              <img
                style={{ width: "200px", height: "200px" }}
                src={image.thumbnailUrl}
              />

              <p>{image.title}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
