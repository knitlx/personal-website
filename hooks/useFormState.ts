import { useState, useCallback } from "react";

export interface ValidationErrors {
  [key: string]: string;
}

export interface UseFormStateOptions<T> {
  initialValues: Partial<T>;
  validate?: (data: T) => ValidationErrors;
  onSubmit?: (data: T) => Promise<void> | void;
}

export function useFormState<T extends object>({
  initialValues,
  validate,
  onSubmit,
}: UseFormStateOptions<T>) {
  const [formData, setFormData] = useState<Partial<T>>(initialValues);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );
  const [loading, setLoading] = useState(false);
  const [isSlugTouched, setIsSlugTouched] = useState(false);

  // Обработчик изменения поля
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear validation error for this field when user starts typing
      if (validationErrors[name]) {
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [validationErrors],
  );

  // Обработчик изменения slug
  const handleSlugChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      generateSlug: (title: string) => string,
      baseUrl: string,
      slugPrefix = "",
    ) => {
      const { name, value } = e.target;

      setFormData((prevFormData) => {
        const newFormData = { ...prevFormData, [name]: value } as T & {
          slug?: string;
          canonicalUrl?: string;
        };

        if (name === "slug") {
          setIsSlugTouched(true);
          newFormData.canonicalUrl = `${baseUrl}/${slugPrefix}${value}`;
        } else if (name === "title" && !isSlugTouched) {
          const generatedSlug = generateSlug(value);
          newFormData.slug = generatedSlug;
          newFormData.canonicalUrl = `${baseUrl}/${slugPrefix}${generatedSlug}`;
        }

        return newFormData;
      });
    },
    [isSlugTouched],
  );

  // Валидация формы
  const validateForm = useCallback(() => {
    if (!validate) return true;

    const errors = validate(formData as T);
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, validate]);

  // Обработчик отправки формы
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (!validateForm()) {
        return false;
      }

      setLoading(true);

      try {
        await onSubmit?.(formData as T);
        return true;
      } catch (error) {
        console.error("Form submission error:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [formData, validateForm, onSubmit],
  );

  // Обновление нескольких полей одновременно
  const updateFields = useCallback((fields: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  }, []);

  // Сброс формы
  const resetForm = useCallback(
    (newValues?: Partial<T>) => {
      setFormData(newValues || initialValues);
      setValidationErrors({});
      setIsSlugTouched(false);
    },
    [initialValues],
  );

  // Установка ошибки валидации
  const setFieldError = useCallback((field: string, error: string) => {
    setValidationErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    handleSlugChange,
    validationErrors,
    setValidationErrors,
    setFieldError,
    loading,
    setLoading,
    isSlugTouched,
    setIsSlugTouched,
    validateForm,
    handleSubmit,
    updateFields,
    resetForm,
  };
}
