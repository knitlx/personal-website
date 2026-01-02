import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactModal from "./ContactModal";
import Providers from "./Providers"; // The modal uses context, so we need this

// Mock dependencies
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "Сообщение успешно отправлено!" }),
  }),
) as jest.Mock;

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: null, status: "unauthenticated" }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("ContactModal Full User Flow", () => {
  beforeEach(() => {
    // Clear mock calls before each test
    (global.fetch as jest.Mock).mockClear();
  });

  it("should allow a user to fill out the form, submit, and see a success message", async () => {
    // 1. Render the component in an open state
    render(
      <Providers>
        <ContactModal isOpen onClose={jest.fn()} />
      </Providers>,
    );

    // 2. Navigate to the form view
    const leaveRequestButton = screen.getByRole("button", {
      name: "Оставить заявку",
    });
    fireEvent.click(leaveRequestButton);

    // 3. Fill out the form fields
    const nameInput = screen.getByLabelText(/Ваше имя/);
    const contactInput = screen.getByLabelText(/Telegram или WhatsApp/);
    const messageTextarea = screen.getByLabelText(/Сообщение/);

    await waitFor(() => {
      fireEvent.change(nameInput, {
        target: { value: "Тестовый Пользователь" },
      });
      fireEvent.change(contactInput, { target: { value: "@testuser" } });
      fireEvent.change(messageTextarea, {
        target: { value: "Это тестовое сообщение для проверки формы." },
      });
    });

    expect(nameInput).toHaveValue("Тестовый Пользователь");
    expect(contactInput).toHaveValue("@testuser");
    expect(messageTextarea).toHaveValue(
      "Это тестовое сообщение для проверки формы.",
    );

    // 4. Submit the form
    const submitButton = screen.getByRole("button", { name: "Отправить" });
    fireEvent.click(submitButton);

    // 5. Check that fetch was called correctly
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        body: expect.any(FormData),
      });
    });

    // 6. Verify that the success message is shown
    const successTitle = await screen.findByText("Спасибо!");
    const successMessage = await screen.findByText(
      "Сообщение успешно отправлено!",
    );

    expect(successTitle).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
  });
});
