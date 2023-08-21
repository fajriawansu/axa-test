import { render, screen } from '@testing-library/react';
import MyButton from './MyButton';

test("button render correctly", () => {
    render(<MyButton children={"Test Button"} />);
    const textElement = screen.getByText(/Test Button/);
    expect(textElement).toBeInTheDocument();
})