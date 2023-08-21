import { render, screen } from '@testing-library/react';
import Bottomside from './Bottomside';

test("bottomside render correctly", () => {
    render(<Bottomside children={"Test Children"} />);
    const textElement = screen.getByText(/Test Children/);
    expect(textElement).toBeInTheDocument();
})