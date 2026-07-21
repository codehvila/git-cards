import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders both git and bash cards initially', () => {
  render(<App />);
  expect(screen.getByText('Clone a repository')).toBeInTheDocument();
  expect(screen.getByText('Make a directory')).toBeInTheDocument();
});

test('shows the "All cards", "git" and "bash" filter buttons', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'All cards' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'git' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'bash' })).toBeInTheDocument();
});

test('filtering by "git" hides bash cards and keeps git cards', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'git' }));

  expect(screen.getByText('Clone a repository')).toBeInTheDocument();
  expect(screen.queryByText('Make a directory')).not.toBeInTheDocument();
});

test('filtering by "bash" hides git cards and keeps bash cards', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'bash' }));

  expect(screen.getByText('Make a directory')).toBeInTheDocument();
  expect(screen.queryByText('Clone a repository')).not.toBeInTheDocument();
});

test('"All cards" resets the filter after filtering', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'git' }));
  fireEvent.click(screen.getByRole('button', { name: 'All cards' }));

  expect(screen.getByText('Clone a repository')).toBeInTheDocument();
  expect(screen.getByText('Make a directory')).toBeInTheDocument();
});

test('font size controls update the --rootfontsize CSS variable', () => {
  render(<App />);
  const [small, normal, big] = screen.getAllByText('A');
  const rootStyle = document.documentElement.style;

  fireEvent.click(small);
  expect(rootStyle.getPropertyValue('--rootfontsize')).toBe('12px');

  fireEvent.click(big);
  expect(rootStyle.getPropertyValue('--rootfontsize')).toBe('20px');

  fireEvent.click(normal);
  expect(rootStyle.getPropertyValue('--rootfontsize')).toBe('16px');
});

test('clicking a command shows a copy notification', async () => {
  render(<App />);
  fireEvent.click(screen.getByText('git init'));

  expect(await screen.findByText('"git init" copied to clipboard!')).toBeInTheDocument();
});
