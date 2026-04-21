"use client";

import BentoButton from "./BentoButton";
import { useContactModal } from "@/contexts/ModalContext";

export default function ServicesCtaButton() {
  const { openContactModal } = useContactModal();

  return (
    <BentoButton variant="primary" onClick={() => openContactModal()}>
      Написать мне
    </BentoButton>
  );
}
