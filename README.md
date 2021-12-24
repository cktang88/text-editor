# text-editor

## Libs:

- [tiptap](https://github.com/ueberdosis/tiptap) core
- https://github.com/nathancahill/split - for resizing
- [react-hotkeys-hook](https://github.com/JohannesKlauss/react-hotkeys-hook) for hotkeys
- Next.js 12 with TypeScript
- [SWR](https://swr.vercel.app/)
- MongoDB (possibly move to Supabase??)

## Spec

- absolutely need full-text-search across all notes inner content, in addition to searching titles

  - mongoDB FTS? or https://github.com/nextapps-de/flexsearch

- requirements for text editor
  - nested lists
  - paste URLs, images
  - multiple panes
  - sync to db
  - code blocks

## Todos

- add pane
- add folder
- rename folder
- move folders around
- add folder search
- move pane to another folder??
- add full-text search
- add currently focused folder to URL state

## Thoughts

- all remote images usually cached, even though they keep attempting to refetch on HTML load, so in practice very efficient

## v2

- resizable images
- Mobile-friendly CSS:
  - need to be all one column in mobile, but be up to a row of 3 in desktop
  - Notes section needs to be on desktop all the time, but be collapsed/expandable in mobile.
- backlinking to different panes, with autocomplete?
