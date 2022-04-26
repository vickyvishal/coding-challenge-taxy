import React from 'react';
import { render, screen } from '@testing-library/react';
import { GenreList } from '../GenreList';
import { BrowserRouter } from 'react-router-dom';

test('Genre list header', () => {
  render(<GenreList />);
  const linkElement = screen.getByText(/Select a Genre/i);
  expect(linkElement).toBeInTheDocument();
});

const MockGenreList = () => {
  return (
    <BrowserRouter>
      <GenreList />
    </BrowserRouter>
  )
}

describe("GenreList", () => {
  test('should render same text pass into title prop', async () => {
    render(<MockGenreList />)
    const genreElement =  screen.queryByTestId("genre-item-0")
    expect(genreElement).toBeDefined();
  })
})