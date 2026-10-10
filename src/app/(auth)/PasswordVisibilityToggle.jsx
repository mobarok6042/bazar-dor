const PasswordVisibilityToggle = ({ isVisible, onToggle }) => (
  <button
    type="button"
    aria-label={isVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখান"}
    aria-pressed={isVisible}
    onClick={onToggle}
    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047F39]"
  >
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {isVisible ? (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.3 9.5 7-.4 1-1.2 2.2-2.4 3.3M6.2 6.2C4.4 7.4 3.1 9.2 2.5 12c.8 2.2 3.9 7 9.5 7 1 0 2-.2 2.9-.5"
          />
        </>
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
        />
      )}
      {!isVisible && (
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  </button>
);

export default PasswordVisibilityToggle;
