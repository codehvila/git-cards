import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { cardGitList, cardBashList } from "./data/data";

const firstGitText = Object.keys(cardGitList)[0];
const firstBashText = Object.keys(cardBashList)[0];

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders both git and bash cards initially", () => {
  render(<App />);

  expect(screen.getByText(firstGitText)).toBeInTheDocument();
  expect(screen.getByText(firstBashText)).toBeInTheDocument();
});

test('shows the "All cards", "git" and "bash" filter buttons', () => {
  render(<App />);
  expect(screen.getByRole("button", { name: "All cards" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "git" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "bash" })).toBeInTheDocument();
});

test('filtering by "git" hides bash cards and keeps git cards', () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "git" }));

  expect(screen.getByText(firstGitText)).toBeInTheDocument();
  expect(screen.queryByText(firstBashText)).not.toBeInTheDocument();
});

test('filtering by "bash" hides git cards and keeps bash cards', () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "bash" }));

  expect(screen.getByText(firstBashText)).toBeInTheDocument();
  expect(screen.queryByText(firstGitText)).not.toBeInTheDocument();
});

test('"All cards" resets the filter after filtering', () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "git" }));
  fireEvent.click(screen.getByRole("button", { name: "All cards" }));

  expect(screen.getByText(firstGitText)).toBeInTheDocument();
  expect(screen.getByText(firstBashText)).toBeInTheDocument();
});

test("font size controls update the --rootfontsize CSS variable", () => {
  render(<App />);
  const rootfontsizeSmall = screen.getByTestId("rootfontsizesmall");
  const rootfontsizeNormal = screen.getByTestId("rootfontsizenormal");
  const rootfontsizeBig = screen.getByTestId("rootfontsizebig");
  const rootStyle = document.documentElement.style;

  fireEvent.click(rootfontsizeSmall);
  expect(rootStyle.getPropertyValue("--rootfontsize")).toBe("12px");

  fireEvent.click(rootfontsizeNormal);
  expect(rootStyle.getPropertyValue("--rootfontsize")).toBe("16px");

  fireEvent.click(rootfontsizeBig);
  expect(rootStyle.getPropertyValue("--rootfontsize")).toBe("20px");
});

test("clicking a command shows a copy notification", async () => {
  render(<App />);
  fireEvent.click(screen.getByText("git init"));

  expect(
    await screen.findByText('"git init" copied to clipboard!'),
  ).toBeInTheDocument();
});
