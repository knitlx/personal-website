"use client";

import { useState } from "react";
import React from "react";
import ContactModal from "./ContactModal";

interface ContactModalWrapperProps {
  button: React.ReactNode;
}

export default function ContactModalWrapper({
  button,
}: ContactModalWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Clone the button element and add onClick handler
  const buttonWithOnClick = React.cloneElement(
    button as React.ReactElement,
    {
      onClick: () => setIsModalOpen(true),
    } as React.HTMLAttributes<HTMLElement>,
  );

  return (
    <>
      {buttonWithOnClick}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
