import { render, screen, fireEvent } from '@testing-library/react';
import Album from './Album';
import { useLoaderData } from 'react-router-dom';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: jest.fn(),
}));

const mockPhotos = [
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
];

beforeEach(() => {
  useLoaderData.mockReturnValue({
    id: '1',
    images: mockPhotos,
    newAlbum: false,
  });
});

test('renders Album component without crashing', () => {
  render(<Album />);
  expect(screen.getByRole('list')).toBeInTheDocument();
});

test('displays all photos from the hardcoded data', () => {
  render(<Album />);
  const images = screen.getAllByRole('img');
  // Should have 6 thumbnails (modal image not rendered initially)
  expect(images).toHaveLength(mockPhotos.length);
});

test('displays photo titles', () => {
  render(<Album />);
  const firstPhotoTitle = screen.getByText(mockPhotos[0].title);
  expect(firstPhotoTitle).toBeInTheDocument();
});

test('displays all photo titles', () => {
  render(<Album />);
  mockPhotos.forEach((photo) => {
    expect(screen.getByText(photo.title)).toBeInTheDocument();
  });
});

test('opens modal with full-size image when thumbnail is clicked', () => {
  render(<Album />);

  const images = screen.getAllByRole('img');
  const firstThumbnail = images[0];

  // Click the first thumbnail
  fireEvent.click(firstThumbnail.closest('li'));

  // Modal should now be visible with the full-size image
  const modalImages = screen.getAllByRole('img');
  // Should now have 7 images: 6 thumbnails + 1 in modal
  expect(modalImages).toHaveLength(mockPhotos.length + 1);

  // Check that the modal image has the correct src
  const modalImage = modalImages.find(img => img.src === mockPhotos[0].url);
  expect(modalImage).toBeInTheDocument();
});

test('closes modal when clicked', () => {
  render(<Album />);

  const images = screen.getAllByRole('img');
  const firstThumbnail = images[0];

  // Click to open modal
  fireEvent.click(firstThumbnail.closest('li'));

  // Verify modal is open
  const modal = screen.getByTestId('image-modal');
  expect(modal).toBeInTheDocument();

  // Click the modal to close it
  fireEvent.click(modal);

  // Modal should now be closed
  expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument();
});

test('switches between different images in modal', () => {
  render(<Album />);

  const images = screen.getAllByRole('img');

  // Click first thumbnail
  fireEvent.click(images[0].closest('li'));
  let modalImage = screen.getAllByRole('img').find(img => img.src === mockPhotos[0].url);
  expect(modalImage).toBeInTheDocument();

  // Close modal
  fireEvent.click(modalImage.closest('div'));

  // Click second thumbnail
  const updatedImages = screen.getAllByRole('img');
  fireEvent.click(updatedImages[1].closest('li'));

  // Check second image is now in modal
  modalImage = screen.getAllByRole('img').find(img => img.src === mockPhotos[1].url);
  expect(modalImage).toBeInTheDocument();
});

test('uses album id from loader data', () => {
  const testId = '42';
  useLoaderData.mockReturnValue({
    id: testId,
    images: mockPhotos,
    newAlbum: false,
  });

  render(<Album />);

  // Component should render successfully with the provided id
  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getByText(testId)).toBeInTheDocument();
});

test('shows empty state when album has no images', () => {
  useLoaderData.mockReturnValue({
    id: '1',
    images: [],
    newAlbum: false,
  });

  render(<Album />);

  expect(screen.getByText('There are no images in this album')).toBeInTheDocument();
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});

test('shows "Create Album" button for new albums', () => {
  useLoaderData.mockReturnValue({
    id: '1',
    images: [],
    newAlbum: true,
  });

  render(<Album />);

  const createButton = screen.getByRole('button', { name: /Create Album/i });
  expect(createButton).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Update Album/i })).not.toBeInTheDocument();
});

test('shows "Update Album" button for existing albums with no images', () => {
  useLoaderData.mockReturnValue({
    id: '1',
    images: [],
    newAlbum: false,
  });

  render(<Album />);

  const updateButton = screen.getByRole('button', { name: /Update Album/i });
  expect(updateButton).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Create Album/i })).not.toBeInTheDocument();
});

test('shows alert when Create Album button is clicked', () => {
  useLoaderData.mockReturnValue({
    id: '1',
    images: [],
    newAlbum: true,
  });

  window.alert = jest.fn();

  render(<Album />);

  const createButton = screen.getByRole('button', { name: /Create Album/i });
  fireEvent.click(createButton);

  expect(window.alert).toHaveBeenCalledWith('Album created!');
});

test('shows alert when Update Album button is clicked', () => {
  useLoaderData.mockReturnValue({
    id: '1',
    images: [],
    newAlbum: false,
  });

  window.alert = jest.fn();

  render(<Album />);

  const updateButton = screen.getByRole('button', { name: /Update Album/i });
  fireEvent.click(updateButton);

  expect(window.alert).toHaveBeenCalledWith('Album saved!');
});
