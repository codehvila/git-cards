import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Sentence from './Sentence';

test('renders the command text', () => {
  render(<Sentence setNotification={vi.fn()}>git status</Sentence>);
  expect(screen.getByText('git status')).toBeInTheDocument();
});

test('copies the exact command text to the clipboard on click', async () => {
  render(<Sentence setNotification={vi.fn()}>git status</Sentence>);
  fireEvent.click(screen.getByText('git status'));

  await waitFor(() => {
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('git status');
  });
});

test('notifies with the copied command text on click', async () => {
  const setNotification = vi.fn();
  render(<Sentence setNotification={setNotification}>git status</Sentence>);
  fireEvent.click(screen.getByText('git status'));

  await waitFor(() => {
    expect(setNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        text: '"git status" copied to clipboard!',
        category: 'info',
      })
    );
  });
});

test('does not notify and logs the error when the clipboard write fails', async () => {
  navigator.clipboard.writeText.mockRejectedValueOnce(new Error('denied'));
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  const setNotification = vi.fn();

  render(<Sentence setNotification={setNotification}>git status</Sentence>);
  fireEvent.click(screen.getByText('git status'));

  await waitFor(() => {
    expect(consoleError).toHaveBeenCalledWith('Failed to copy: ', expect.any(Error));
  });
  expect(setNotification).not.toHaveBeenCalled();

  consoleError.mockRestore();
});
