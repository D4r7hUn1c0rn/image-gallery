import { render, screen } from '@testing-library/react';
import ImageGallery from './ImageGallery';

test('renders Image Albums', () => {
  render(<ImageGallery />);
  const linkElement = screen.getByText(/image albmus/i);
  expect(linkElement).toBeInTheDocument();
});
