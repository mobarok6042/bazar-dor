"use client";

const GoogleIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 37.99 46.98 31.8 46.98 24.55Z" />
    <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
  </svg>
);

const GithubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.28 4.61 1.59.1-.73.39-1.23.7-1.51-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.03.75 2.08v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
  </svg>
);

const SocialAuthButtons = ({ onGoogleSignIn, onGithubSignIn }) => (
  <>
    <div className="divider my-1 text-sm text-base-content/70">অথবা এভাবে চালিয়ে যান</div>
    <div className="grid gap-3 sm:grid-cols-2">
      <button type="button" onClick={onGoogleSignIn} className="btn btn-outline w-full border-2 border-base-content/40 font-semibold hover:border-[#047F39] hover:bg-[#047F39] hover:text-white">
        <GoogleIcon />
        গুগল
      </button>
      <button type="button" onClick={onGithubSignIn} className="btn btn-outline w-full border-2 border-base-content/40 font-semibold hover:border-[#047F39] hover:bg-[#047F39] hover:text-white">
        <GithubIcon />
        গিটহাব
      </button>
    </div>
  </>
);

export default SocialAuthButtons;
