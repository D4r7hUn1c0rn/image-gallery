import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './error-page';
import ImageGallery from './ImageGallery/ImageGallery';
import Album from './Album/Album';
import { albumLoader } from './Album/albumLoader';
import { imageLoader } from './ImageGallery/imageLoader';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ImageGallery />,
    loader: imageLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/album/:id",
    loader: albumLoader,
    element: <Album />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
