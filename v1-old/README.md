# text-editor

- TailwindCSS
  - Next.js with TailwindCSS config files from https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss
- Quill
  - slate is too hacky
- Next.js with TypeScript

## NOTES

- CSS is hard to get right on mobile + desktop
  - need to be all one column in mobile, but be up to a row of 3 in desktop
- Notes section needs to be on desktop all the time, but be collapsed/expandable in mobile.

- absolutely need full-text-search across all notes inner content, in addition to searching titles

  - store text in mongoDB, use mongoDB FTS?

- requirements for text editor
  - nested lists
  - paste URLs
  - multiple panes
  - preferably hide taskbar, one master taskbar + popups?
  - paste images
