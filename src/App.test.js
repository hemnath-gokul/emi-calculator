import { render, screen } from '@testing-library/react';
import App from './App';

test("renders EMI calculator title", () => {
  render(<App />);
  const title = screen.getByText(/Home Loan EMI Calculator/i);
  expect(title).toBeInTheDocument();
});
