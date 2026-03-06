import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: 'var(--main)',
        mainForeground: 'var(--main-foreground)',
        background: 'var(--bg)',
        border: 'var(--border)',
        secondaryBackground: 'var(--secondary-bg)',
      },
      borderRadius: {
        base: 'var(--border-radius)',
      },
      boxShadow: {
        shadow: 'var(--box-shadow-x) var(--box-shadow-y) 0px 0px rgba(0,0,0,1)',
      },
      translate: {
        boxShadowX: 'var(--box-shadow-x)',
        boxShadowY: 'var(--box-shadow-y)',
        reverseBoxShadowX: 'var(--reverse-box-shadow-x)',
        reverseBoxShadowY: 'var(--reverse-box-shadow-y)',
      },
      fontWeight: {
        base: '500',
        heading: '700',
      },
    },
  },
  plugins: [],
};
export default config;
