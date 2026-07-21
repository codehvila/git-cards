import { render, screen } from '@testing-library/react';
import Card from './Card';

test('renders the given title', () => {
  render(<Card title="Clone a repository" type="git" />);
  expect(screen.getByText('Clone a repository')).toBeInTheDocument();
});

test('renders children in the content area', () => {
  render(
    <Card title="Some card" type="git">
      <p>git clone repo</p>
    </Card>
  );
  expect(screen.getByText('git clone repo')).toBeInTheDocument();
});

test('shows the git icon when type is "git"', () => {
  render(<Card title="Some card" type="git" />);
  expect(screen.getByAltText('Git icon')).toBeInTheDocument();
  expect(screen.queryByAltText('Bash icon')).not.toBeInTheDocument();
});

test('shows the bash icon for any non-git type', () => {
  render(<Card title="Some card" type="bash" />);
  expect(screen.getByAltText('Bash icon')).toBeInTheDocument();
  expect(screen.queryByAltText('Git icon')).not.toBeInTheDocument();
});
