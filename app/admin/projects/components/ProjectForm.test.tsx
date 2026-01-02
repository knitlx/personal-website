import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectForm from "./ProjectForm";
import Providers from "../../../components/Providers"; // Import the Providers component

// Mocking dependencies
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("../../components/ImageUploadField", () => () => (
  <div data-testid="mock-image-upload" />
));
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

describe("ProjectForm", () => {
  const baseUrl = "http://localhost:3000";
  const renderWithProviders = (
    ui: React.ReactElement,
  ): ReturnType<typeof render> => {
    return render(<Providers>{ui}</Providers>);
  };

  beforeEach(() => {
    // Reset mocks before each test
    (global.fetch as jest.Mock).mockClear();
  });

  // Test 1: Renders initial data correctly
  it("should render initial data in the form fields", () => {
    const initialData = {
      title: "Тестовый проект",
      slug: "testoviy-proekt",
      shortDescriptionHomepage: "Краткое описание",
    };

    renderWithProviders(
      <ProjectForm initialData={initialData} baseUrl={baseUrl} />,
    );

    expect(screen.getByLabelText("Название")).toHaveValue(initialData.title);
    expect(screen.getByLabelText("ЧПУ (URL)")).toHaveValue(initialData.slug);
    expect(
      screen.getByLabelText("Краткое описание для главной страницы"),
    ).toHaveValue(initialData.shortDescriptionHomepage);
  });

  // Test 2: Automatically generates slug from title
  it("should automatically generate a slug when typing a title", () => {
    renderWithProviders(<ProjectForm baseUrl={baseUrl} />);

    const titleInput = screen.getByLabelText("Название");
    const slugInput = screen.getByLabelText("ЧПУ (URL)");

    fireEvent.change(titleInput, { target: { value: "Новый Супер Проект" } });

    expect(slugInput).toHaveValue("novyy-super-proekt");
  });

  // Test 3: Stops auto-generating slug if slug is manually edited
  it("should stop auto-generating slug after it has been manually edited", () => {
    renderWithProviders(<ProjectForm baseUrl={baseUrl} />);

    const titleInput = screen.getByLabelText("Название");
    const slugInput = screen.getByLabelText("ЧПУ (URL)");

    // Auto-generation works initially
    fireEvent.change(titleInput, { target: { value: "Первый Заголовок" } });
    expect(slugInput).toHaveValue("pervyy-zagolovok");

    // Manually edit the slug
    fireEvent.change(slugInput, { target: { value: "moy-slug-vruchnuyu" } });
    expect(slugInput).toHaveValue("moy-slug-vruchnuyu");

    // Change the title again
    fireEvent.change(titleInput, { target: { value: "Второй Заголовок" } });

    // The slug should NOT change
    expect(slugInput).toHaveValue("moy-slug-vruchnuyu");
  });
});
