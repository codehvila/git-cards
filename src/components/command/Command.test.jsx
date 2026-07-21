import { render, screen } from '@testing-library/react';
import Command from './Command';

test('renders children inside the commands wrapper', () => {
  render(
    <Command>
      <span>git status</span>
    </Command>
  );
  const child = screen.getByText('git status');
  expect(child).toBeInTheDocument();
  expect(child.closest('.commands')).not.toBeNull();
});
