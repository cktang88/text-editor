# text-editor

Libs:

- https://github.com/ueberdosis/tiptap core
- react-treebeard --> TODO: need to replace lol
- https://github.com/nathancahill/split - for resizing
- Next.js 12 with TypeScript
- SWR
- MongoDB backend (possibly move to Supabase??)

Extra stuff:

- https://github.com/downshift-js/downshift for autocomplete?

## Spec

- absolutely need full-text-search across all notes inner content, in addition to searching titles

  - mongoDB FTS? or https://github.com/nextapps-de/flexsearch

- requirements for text editor
  - nested lists
  - paste URLs, images
  - multiple panes
  - sync to db

## Todos

- add pane
- add folder
- move folders around
- fix folder display
- add full-text search
- add better formatting?

## Thoughts

- all remote images usually cached, even though they keep attempting to refetch on HTML load, so in practice very efficient

## v2

- resizable images
- Mobile-friendly CSS:
  - need to be all one column in mobile, but be up to a row of 3 in desktop
  - Notes section needs to be on desktop all the time, but be collapsed/expandable in mobile.
