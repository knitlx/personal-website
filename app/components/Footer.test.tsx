import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("should render footer with navigation and social links", () => {
    render(<Footer />);

    // Check for tagline - actual content has two spans
    expect(screen.getByText(/AI-системы/i)).toBeInTheDocument();
    expect(screen.getByText(/автоматизация процессов/i)).toBeInTheDocument();

    // Check for navigation links - using getAllByRole for duplicates (desktop + mobile)
    expect(screen.getAllByRole("link", { name: "Услуги" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Проекты" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Обо мне" })).toHaveLength(2);

    // Check for social links - duplicates (desktop + mobile)
    expect(screen.getAllByRole("link", { name: "Telegram" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "WhatsApp" })).toHaveLength(2);

    // Check for copyright notice
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} NoChaos\\. Все права защищены\\.`))
    ).toBeInTheDocument();
  });

  it("should have correct href attributes for links", () => {
    render(<Footer />);

    const servicesLinks = screen.getAllByRole("link", { name: "Услуги" });
    const projectsLinks = screen.getAllByRole("link", { name: "Проекты" });
    const aboutLinks = screen.getAllByRole("link", { name: "Обо мне" });
    const telegramLinks = screen.getAllByRole("link", { name: "Telegram" });
    const whatsappLinks = screen.getAllByRole("link", { name: "WhatsApp" });

    // Check first instance (should be the same for duplicates)
    expect(servicesLinks[0]).toHaveAttribute("href", "/services");
    expect(projectsLinks[0]).toHaveAttribute("href", "/projects");
    expect(aboutLinks[0]).toHaveAttribute("href", "/about");
    expect(telegramLinks[0]).toHaveAttribute("href", "https://t.me/knitlx");
    expect(whatsappLinks[0]).toHaveAttribute("href", "https://wa.me/79154683416");
  });
});
