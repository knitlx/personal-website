import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";
import Providers from "../../../components/Providers";

// Mocking dependencies
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("../../components/SeoFields", () => () => (
  <div data-testid="mock-seo-fields" />
));
jest.mock("../../../components/SeoPreview", () => () => (
  <div data-testid="mock-seo-preview" />
));
jest.mock("@uiw/react-md-editor", () => () => (
  <div data-testid="mock-md-editor" />
));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;

describe("BlogForm", () => {
  const baseUrl = "http://localhost:3000";
  const renderWithProviders = (
    ui: React.ReactElement,
  ): ReturnType<typeof render> => {
    return render(<Providers>{ui}</Providers>);
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("should render initial data in the form fields", () => {
    const initialData = {
      title: "Тестовая статья",
      slug: "testovaya-statya",
      description: "Краткое описание статьи",
    };

    renderWithProviders(
      <BlogForm initialData={initialData} baseUrl={baseUrl} />,
    );

    expect(screen.getByLabelText("Заголовок")).toHaveValue(initialData.title);
    expect(screen.getByLabelText("ЧПУ (URL)")).toHaveValue(initialData.slug);
    expect(screen.getByLabelText("Краткое описание")).toHaveValue(
      initialData.description,
    );
  });

  it("should automatically generate a slug when typing a title", () => {
    renderWithProviders(<BlogForm baseUrl={baseUrl} />);

    const titleInput = screen.getByLabelText("Заголовок");
    const slugInput = screen.getByLabelText("ЧПУ (URL)");

    fireEvent.change(titleInput, {
      target: { value: "Новая Интересная Статья" },
    });

    expect(slugInput).toHaveValue("novaya-interesnaya-statya");
  });

  it("should stop auto-generating slug after it has been manually edited", () => {
    renderWithProviders(<BlogForm baseUrl={baseUrl} />);

    const titleInput = screen.getByLabelText("Заголовок");
    const slugInput = screen.getByLabelText("ЧПУ (URL)");

    fireEvent.change(titleInput, { target: { value: "Первый Заголовок" } });
    expect(slugInput).toHaveValue("pervyy-zagolovok");

    fireEvent.change(slugInput, { target: { value: "slug-dlya-bloga" } });
    expect(slugInput).toHaveValue("slug-dlya-bloga");

    fireEvent.change(titleInput, { target: { value: "Другой Заголовок" } });
    expect(slugInput).toHaveValue("slug-dlya-bloga");
  });
});
