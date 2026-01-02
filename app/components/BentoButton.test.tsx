import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BentoButton from "./BentoButton";

describe("BentoButton", () => {
  // Test 1: Renders as a link when href is provided
  it("should render as a link with the correct href", () => {
    render(<BentoButton href="/projects">Проекты</BentoButton>);

    const linkElement = screen.getByRole("link", { name: "Проекты" });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/projects");
  });

  // Test 2: Renders as a button when onClick is provided
  it("should render as a button and handle clicks", () => {
    const handleClick = jest.fn();
    render(<BentoButton onClick={handleClick}>Нажми меня</BentoButton>);

    const buttonElement = screen.getByRole("button", { name: "Нажми меня" });
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test 3: Renders a disabled button
  it("should render a disabled button", () => {
    const handleClick = jest.fn();
    render(
      <BentoButton onClick={handleClick} disabled>
        Неактивная кнопка
      </BentoButton>,
    );

    const buttonElement = screen.getByRole("button", {
      name: "Неактивная кнопка",
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();

    // Ensure onClick is not called when disabled
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test 4: Applies correct classes for variant and size
  it("should apply correct classes for variant and size", () => {
    render(
      <BentoButton variant="outline" size="small">
        Маленькая кнопка
      </BentoButton>,
    );

    const buttonElement = screen.getByRole("button", {
      name: "Маленькая кнопка",
    });
    // Check for a class specific to the 'outline' variant
    expect(buttonElement).toHaveClass("border-gray-200");
    // Check for a class specific to the 'small' size
    expect(buttonElement).toHaveClass("px-[15px] py-[8px]");
  });

  // Test 5: Defaults to a button if no props are provided
  it("should render as a button by default", () => {
    render(<BentoButton>Кнопка по умолчанию</BentoButton>);

    const buttonElement = screen.getByRole("button", {
      name: "Кнопка по умолчанию",
    });
    expect(buttonElement).toBeInTheDocument();
  });
});
