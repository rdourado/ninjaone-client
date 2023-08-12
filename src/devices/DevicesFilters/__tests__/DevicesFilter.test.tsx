import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DevicesFilters from '../index';

describe('DevicesFilters', () => {
  it('should render the component with input fields and options', () => {
    render(<DevicesFilters />);

    // Check if input fields and options are rendered
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Device type')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Device type')).toBeInTheDocument();
    expect(screen.getByLabelText('Sort by')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sort by')).toBeInTheDocument();
  });
});
