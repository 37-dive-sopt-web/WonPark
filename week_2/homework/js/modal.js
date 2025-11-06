export function openModal(backdrop, modal, form) {
  backdrop.classList.remove("hidden");
  modal.classList.remove("hidden");
  form.reset();
}

export function closeModal(backdrop, modal) {
  backdrop.classList.add("hidden");
  modal.classList.add("hidden");
}
