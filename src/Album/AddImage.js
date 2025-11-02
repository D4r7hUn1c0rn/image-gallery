import { useState } from 'react';
import axios from 'axios';

export default function AddImage({ albumId, imageIndex, createNewAlbum, onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // ok, this should be a field error array to highlight the fields with error styling
    if (!title.trim()) {
      alert('Please provide a title for the image');
      return;
    }

    if (!imageFile) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', imageFile);
      formData.append('albumId', albumId);

      if (createNewAlbum) {
        formData.append('imageIndex', imageIndex);
      }

      // Choose endpoint based on createNewAlbum flag - this is probably not necessary if the backend takes care of creating a new album when needed
      const endpoint = createNewAlbum
        ? '/api/SaveAlbum'
        : '/api/UpdateImageList';

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Call onSave callback with response data if provided
      if (onSave) {
        onSave({
          albumId,
          imageIndex,
          title,
          imageFile,
          imagePreview,
          response: response.data
        });
      }

      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save image');
      console.error('Error saving image:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    setLoading(false);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        style={{
          padding: '10px 20px',
          fontSize: '14px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007bff',
          color: 'white',
          cursor: 'pointer',
          marginLeft: '30px',
        }}
      >
        Add Image
      </button>
    );
  }

  return (
    <div
      data-testid="add-image-modal"
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          width: '500px',
          maxWidth: '90%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Add New Image</h2>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="image" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {imagePreview && (
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
        )}

        {error && (
          <div
            style={{
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={handleClose}
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              color: '#777777',
              opacity: loading ? 0.6 : 1,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
