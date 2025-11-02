import React, { useState } from 'react';
import { useLoaderData } from "react-router-dom";

export default function ImageGallery () {
  const { albums } = useLoaderData();

  const [addNew, setAddNew] = useState(false);
  const [albumList, setAlbumList] = useState(albums);
  const [newAlbumName, setNewAlbumName] = useState('');

  const keyUpHandler = (e) => {
    if (e.key === 'Enter') {
      saveToList(e.target.value);
    }else{
      setNewAlbumName(e.target.value);
    }
  };

  const saveToList = (albumName) => {
    // save people from themselves
    if(albumName.trim() === '') return;
    // would probably patch the album list to a backend here, but going with letting the image loader decide
    setAlbumList([...albumList, {id: albumList.length + 1, title: albumName, new: true}]);
    setAddNew(false);
    setNewAlbumName('');
  };

  return (
    <>
      <h1 class="page-title">Image Albums</h1>
      <ul>
        {albumList.map((album, i) => {
          return (
            <li key={i}>
              <a href={`album/${album.id}${album.new ? '?create=true' : ''}`}>{album.title}</a>
            </li>
          );
        })}
        {addNew ? (
          <li>
            <input type="text" onKeyUp={keyUpHandler} placeholder="New album name...." /> 
          </li>
        ) : (
          <></>
        )}
      </ul>
      {addNew ? (
        <button onClick={() => saveToList(newAlbumName)}>Save album</button>
      ) : (
        <button onClick={() => setAddNew(true)}>Add new</button>
      )}
    </>
  );
};
