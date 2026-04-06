import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ImageModal from "./ImageModal";

jest.mock("next/image", () => {
  return function MockNextImage(
    props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; sizes?: string }
  ) {
    const { fill: _fill, sizes: _sizes, ...imgProps } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...imgProps} alt={props.alt ?? ""} />;
  };
});

describe("ImageModal", () => {
  it("renders image inside a viewport-sized container", () => {
    render(<ImageModal imageUrl="/uploads/test.webp" onClose={jest.fn()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByAltText("Просмотр изображения в полном размере")).toBeInTheDocument();

    const frame = screen.getByTestId("image-modal-frame");
    expect(frame).toHaveClass("w-[min(96vw,1200px)]");
    expect(frame).toHaveClass("h-[min(88vh,900px)]");
  });

  it("closes when close button is clicked", () => {
    const onClose = jest.fn();
    render(<ImageModal imageUrl="/uploads/test.webp" onClose={onClose} />);

    fireEvent.click(screen.getByLabelText("Закрыть просмотр изображения"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
