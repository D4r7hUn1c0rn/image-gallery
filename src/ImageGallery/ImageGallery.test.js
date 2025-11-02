import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageGallery from './ImageGallery';
import { useLoaderData } from 'react-router-dom';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: jest.fn(),
}));

const mockAlbums = [
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
];

beforeEach(() => {
  useLoaderData.mockReturnValue({
    albums: mockAlbums,
  });
});

test('renders Image Albums', () => {
  render(<ImageGallery />);
  const linkElement = screen.getByText(/Image Albums/i);
  expect(linkElement).toBeInTheDocument();
});

test('displays all albums from loader data', () => {
  render(<ImageGallery />);
  const albumLinks = screen.getAllByRole('link');
  expect(albumLinks).toHaveLength(mockAlbums.length);
});

test('shows input field when "Add new" button is clicked', () => {
  render(<ImageGallery />);

  // Initially, input should not be visible
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

  // Click "Add new" button
  const addButton = screen.getByRole('button', { name: /Add new/i });
  fireEvent.click(addButton);

  // Input should now be visible
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('adds new album when Enter key is pressed', async () => {
  render(<ImageGallery />);

  // Click "Add new" button
  const addButton = screen.getByRole('button', { name: /Add new/i });
  await userEvent.click(addButton);

  // Type album name and press Enter
  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'New Album{Enter}');

  // Verify new album is added
  expect(screen.getByText('New Album')).toBeInTheDocument();

  // Input should be hidden after saving
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});

test('adds new album when "Save album" button is clicked', async () => {
  render(<ImageGallery />);

  // Click "Add new" button
  const addButton = screen.getByRole('button', { name: /Add new/i });
  await userEvent.click(addButton);

  // Type album name
  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'Another New Album');

  // Click "Save album" button
  const saveButton = screen.getByRole('button', { name: /Save album/i });
  await userEvent.click(saveButton);

  // Verify new album is added
  expect(screen.getByText('Another New Album')).toBeInTheDocument();

  // Input should be hidden after saving
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});

test('does not add album with empty or whitespace-only name', async () => {
  render(<ImageGallery />);

  const initialAlbumCount = mockAlbums.length;

  // Click "Add new" button
  const addButton = screen.getByRole('button', { name: /Add new/i });
  await userEvent.click(addButton);

  // Press Enter without typing (empty string)
  const input = screen.getByRole('textbox');
  await userEvent.type(input, '{Enter}');

  // Input should still be visible (not saved)
  expect(screen.getByRole('textbox')).toBeInTheDocument();

  // Album count should remain the same
  const albumLinks = screen.getAllByRole('link');
  expect(albumLinks).toHaveLength(initialAlbumCount);
});
