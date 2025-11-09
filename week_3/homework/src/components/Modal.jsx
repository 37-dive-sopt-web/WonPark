import { createPortal } from "react-dom";

export default function Modal({ open, title, children, actions }) {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[28rem] shadow-lg">
        {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
        <div className="mb-4">{children}</div>
        {actions && <div className="flex gap-2 justify-end">{actions}</div>}
      </div>
    </div>,
    document.body
  );
}
