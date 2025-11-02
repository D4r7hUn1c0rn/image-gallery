import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddImage from './AddImage';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('AddImage Component', () => {
  let mockOnSave;

  beforeEach(() => {
    mockOnSave = jest.fn();
    window.alert = jest.fn();
    jest.clearAllMocks();
  });

  test('renders "Add Image" button by default', () => {
    render(<AddImage onSave={mockOnSave} />);

    const button = screen.getByRole('button', { name: /Add Image/i });
    expect(button).toBeInTheDocument();
    expect(screen.queryByTestId('add-image-modal')).not.toBeInTheDocument();
  });

  test('opens modal when "Add Image" button is clicked', () => {
    render(<AddImage onSave={mockOnSave} />);

    const button = screen.getByRole('button', { name: /Add Image/i });
    fireEvent.click(button);

    expect(screen.getByTestId('add-image-modal')).toBeInTheDocument();
    expect(screen.getByText('Add New Image')).toBeInTheDocument();
  });

  test('displays title input field when modal is open', () => {
    render(<AddImage onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    const titleInput = screen.getByLabelText(/Title/i);
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveAttribute('type', 'text');
  });

  test('displays image upload input when modal is open', () => {
    render(<AddImage onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    const imageInput = screen.getByLabelText(/Image/i);
    expect(imageInput).toBeInTheDocument();
    expect(imageInput).toHaveAttribute('type', 'file');
    expect(imageInput).toHaveAttribute('accept', 'image/*');
  });

  test('updates title when user types', () => {
    render(<AddImage onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: 'Test Image Title' } });

    expect(titleInput.value).toBe('Test Image Title');
  });

  test('closes modal when Cancel button is clicked', () => {
    render(<AddImage onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));
    expect(screen.getByTestId('add-image-modal')).toBeInTheDocument();

    // Click cancel
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);

    // Modal should be closed
    expect(screen.queryByTestId('add-image-modal')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Image/i })).toBeInTheDocument();
  });

  test('closes modal when backdrop is clicked', () => {
    render(<AddImage onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));
    expect(screen.getByTestId('add-image-modal')).toBeInTheDocument();

    // Click backdrop
    const backdrop = screen.getByTestId('add-image-modal');
    fireEvent.click(backdrop);

    // Modal should be closed
    expect(screen.queryByTestId('add-image-modal')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Image/i })).toBeInTheDocument();
  });

  test('does not close modal when clicking inside content area', () => {
    render(<AddImage onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    const modalContent = screen.getByText('Add New Image').closest('div');
    fireEvent.click(modalContent);

    // Modal should still be open
    expect(screen.getByTestId('add-image-modal')).toBeInTheDocument();
  });

  test('shows alert when trying to save without title', () => {
    render(<AddImage onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    // Create a mock file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const imageInput = screen.getByLabelText(/Image/i);
    fireEvent.change(imageInput, { target: { files: [file] } });

    // Click save without entering title
    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    expect(window.alert).toHaveBeenCalledWith('Please provide a title for the image');
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  test('shows alert when trying to save without image', () => {
    render(<AddImage onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    // Enter title only
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });

    // Click save without uploading image
    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    expect(window.alert).toHaveBeenCalledWith('Please upload an image');
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  test('shows alert when trying to save with empty title', () => {
    render(<AddImage onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    // Enter whitespace-only title
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: '   ' } });

    // Upload file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const imageInput = screen.getByLabelText(/Image/i);
    fireEvent.change(imageInput, { target: { files: [file] } });

    // Click save
    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    expect(window.alert).toHaveBeenCalledWith('Please provide a title for the image');
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  test('calls API and onSave when both title and image are provided for UpdateImageList', async () => {
    const albumId = 1;
    const imageIndex = 5;
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValue(mockResponse);

    render(<AddImage albumId={albumId} imageIndex={imageIndex} createNewAlbum={false} onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    // Enter title
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: 'My Test Image' } });

    // Upload file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const imageInput = screen.getByLabelText(/Image/i);
    fireEvent.change(imageInput, { target: { files: [file] } });

    // Click save
    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    // Verify loading state
    expect(saveButton).toHaveTextContent('Saving...');
    expect(saveButton).toBeDisabled();

    // Wait for API call
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/UpdateImageList',
        expect.any(FormData),
        expect.objectContaining({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
    });

    // Verify onSave callback was called
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({
          albumId,
          imageIndex,
          title: 'My Test Image',
          imageFile: file,
          response: mockResponse.data,
        })
      );
    });

    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByTestId('add-image-modal')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Add Image/i })).toBeInTheDocument();
    });
  });

  test('calls SaveAlbum API when createNewAlbum is true', async () => {
    const albumId = 1;
    const imageIndex = 0;
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValue(mockResponse);

    render(<AddImage albumId={albumId} imageIndex={imageIndex} createNewAlbum={true} onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    // Enter title
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: 'New Album Image' } });

    // Upload file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const imageInput = screen.getByLabelText(/Image/i);
    fireEvent.change(imageInput, { target: { files: [file] } });

    // Click save
    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    // Wait for API call
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/SaveAlbum',
        expect.any(FormData),
        expect.objectContaining({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      );
    });
  });

  test('displays error message when API call fails', async () => {
    const errorMessage = 'Network error';
    axios.post.mockRejectedValue(new Error(errorMessage));

    render(<AddImage albumId={1} createNewAlbum={false} onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    // Enter title
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: 'Test Image' } });

    // Upload file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const imageInput = screen.getByLabelText(/Image/i);
    fireEvent.change(imageInput, { target: { files: [file] } });

    // Click save
    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Modal should still be open
    expect(screen.getByTestId('add-image-modal')).toBeInTheDocument();
    expect(mockOnSave).not.toHaveBeenCalled();
  });

  test('clears form and closes modal when closing after data entry', () => {
    render(<AddImage onSave={mockOnSave} />);

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));

    // Enter some data
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.change(titleInput, { target: { value: 'Test' } });

    // Click cancel
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);

    // Modal should be closed
    expect(screen.queryByTestId('add-image-modal')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Image/i })).toBeInTheDocument();

    // Re-open modal to verify form was cleared
    fireEvent.click(screen.getByRole('button', { name: /Add Image/i }));
    const titleInputAgain = screen.getByLabelText(/Title/i);
    expect(titleInputAgain.value).toBe('');
  });
});
