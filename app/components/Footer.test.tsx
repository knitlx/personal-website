import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("should render the footer with navigation and social links", () => {
    render(<Footer />);

    // Check for the tagline
    expect(
      screen.getByText("AI-универсал для ваших систем"),
    ).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByRole("link", { name: "Услуги" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Проекты" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Обо мне" })).toBeInTheDocument();

    // Check for social links
    expect(screen.getByRole("link", { name: "Telegram" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "WhatsApp" })).toBeInTheDocument();

    // Check for the copyright notice
    const currentYear = new Date().getFullYear();
    // Using a regex to match the copyright text regardless of surrounding whitespace
    expect(
      screen.getByText(
        `© ${currentYear} Бизнес-ассистент. Все права защищены.`,
      ),
    ).toBeInTheDocument();
  });

  it("should have correct href attributes for links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Услуги" })).toHaveAttribute(
      "href",
      "/services",
    );
    expect(screen.getByRole("link", { name: "Проекты" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: "Обо мне" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute(
      "href",
      "https://t.me/knitlx",
    );
  });
});
