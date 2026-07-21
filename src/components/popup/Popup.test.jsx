import { act, render, screen } from '@testing-library/react';
import Popup from './Popup';
import styles from './Popup.module.css';

afterEach(() => {
  vi.useRealTimers();
});

test('renders the notification text', () => {
  render(
    <Popup notification={{ text: 'Copied!', category: 'info', setNotification: vi.fn() }} />
  );
  expect(screen.getByText('Copied!')).toBeInTheDocument();
});

test('applies the CSS class for the notification category', () => {
  render(
    <Popup notification={{ text: 'Copied!', category: 'info', setNotification: vi.fn() }} />
  );
  expect(screen.getByText('Copied!')).toHaveClass(styles.alert, styles.info);
});

test('falls back to the default notification when none is provided', () => {
  render(<Popup />);
  expect(screen.getByText('Hello!')).toBeInTheDocument();
});

test('hides itself by calling setNotification(null) after 4 seconds', () => {
  vi.useFakeTimers();
  const setNotification = vi.fn();
  render(
    <Popup notification={{ text: 'Copied!', category: 'info', setNotification }} />
  );

  act(() => {
    vi.advanceTimersByTime(4000);
  });

  expect(setNotification).toHaveBeenCalledWith(null);
});

test('clears the timeout on unmount so setNotification is never called', () => {
  vi.useFakeTimers();
  const setNotification = vi.fn();
  const { unmount } = render(
    <Popup notification={{ text: 'Copied!', category: 'info', setNotification }} />
  );

  unmount();
  act(() => {
    vi.advanceTimersByTime(4000);
  });

  expect(setNotification).not.toHaveBeenCalled();
});
