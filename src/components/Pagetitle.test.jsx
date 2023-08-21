import { render, screen } from '@testing-library/react';
import Pagetitle from './Pagetitle';

test("pagetitle render correctly", () => {
    render(<Pagetitle title={"Test Judul"} />);
    const textElement = screen.getByText(/Test Judul/);
    expect(textElement).toBeInTheDocument();
})