import { generateSlug } from "./slug";

describe("generateSlug", () => {
  // Test case 1: Basic Cyrillic to Latin transliteration and space handling
  test("should transliterate Cyrillic and replace spaces with hyphens", () => {
    const title = "Привет Мир";
    const expectedSlug = "privet-mir";
    expect(generateSlug(title)).toBe(expectedSlug);
  });

  // Test case 2: Handling of special characters
  test("should remove special characters", () => {
    const title = "Вопрос/Ответ?";
    const expectedSlug = "vopros-otvet";
    expect(generateSlug(title)).toBe(expectedSlug);
  });

  // Test case 3: Handling multiple spaces and hyphens
  test("should replace multiple spaces and hyphens with a single hyphen", () => {
    const title = "Много  пробелов -- и дефисов";
    const expectedSlug = "mnogo-probelov-i-defisov";
    expect(generateSlug(title)).toBe(expectedSlug);
  });

  // Test case 4: Handling leading and trailing hyphens/spaces
  test("should remove leading and trailing hyphens and spaces", () => {
    const title = "- Привет -";
    const expectedSlug = "privet";
    expect(generateSlug(title)).toBe(expectedSlug);
  });

  // Test case 5: Complex string with mixed characters
  test("should handle a complex string with mixed characters correctly", () => {
    const title = "Это (тест) для сложной_строки! 100%";
    const expectedSlug = "eto-test-dlya-slozhnoy-stroki-100";
    expect(generateSlug(title)).toBe(expectedSlug);
  });

  // Test case 6: String that is already a valid slug
  test("should not change a string that is already a valid slug", () => {
    const title = "this-is-a-valid-slug";
    const expectedSlug = "this-is-a-valid-slug";
    expect(generateSlug(title)).toBe(expectedSlug);
  });
});
