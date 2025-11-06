export default function Button({
  children,
  onClick,
  variant = "default",
  className = "",
  type = "button",
  ...props
}) {
  const baseStyles =
    "px-4 py-2 text-white rounded-lg text-sm font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg";

  const variants = {
    default: "bg-pink-500 hover:bg-pink-600",
    "tab-active": "bg-pink-600 text-white rounded-full",
    "tab-inactive":
      "bg-pink-300 text-pink-600 hover:bg-pink-600 hover:text-white rounded-full",
    clear: "bg-pink-400 hover:bg-pink-600 text-gray-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
