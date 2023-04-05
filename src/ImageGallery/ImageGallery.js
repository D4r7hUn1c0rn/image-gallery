import React, { useState } from 'react';

export default function ImageGallery () {
  const [addNew, setAddNew] = useState(false);
  const [albums, setAlbums] = useState([
    {
      id: 1,
      title: 'Lorem ipsum'
    },
    {
      id: 2,
      title: 'Lorem ipsum'
    },
    {
      id: 3,
      title: 'Lorem ipsum'
    },
    {
      id: 4,
      title: 'Lorem ipsum'
    },
    {
      id: 5,
      title: 'Lorem ipsum'
    }
  ]);

  const keyUpHandler = (e) => {
    if (e.key === 'Enter') {
      setAlbums((albums) => albums);
      setAddNew(false);
    }
  };

  return (
    <>
      <h1>Image Albums</h1>
      <ul>
        {albums.map((album) => {
          return (
            <li>
              <a href={`album/${album.title}`}>{album.title}</a>
            </li>
          );
        })}
        {addNew ? (
          <li>
            <input type="text" onKeyUp={keyUpHandler} />
          </li>
        ) : (
          <></>
        )}
      </ul>

      <br />
      <button style={{marginLeft: '20px'}} onClick={() => setAddNew(true)}>Add new</button>
    </>
  );
};
