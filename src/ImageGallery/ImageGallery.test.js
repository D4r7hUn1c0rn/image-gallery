import { render, screen } from '@testing-library/react';
import ImageGallery from './ImageGallery';
import { useLoaderData } from 'react-router-dom';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: jest.fn(),
}));

test('renders Image Albums', () => {
  // Mock the loader data
  useLoaderData.mockReturnValue({
    albums: [
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
    ],
  });

  render(<ImageGallery />);
  const linkElement = screen.getByText(/Image Albums/i);
  expect(linkElement).toBeInTheDocument();
});
