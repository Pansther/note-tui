# Project Overview: note-tui

`note-tui` is a Terminal User Interface (TUI) application designed for efficient note management directly from the command line. It provides a clean interface with a split-pane view, allowing users to browse a list of notes and preview their content with full Markdown syntax highlighting.

## Technologies Used

*   **Frontend:** React (rendered in the terminal using [Ink](https://www.npmjs.com/package/ink))
*   **Language:** TypeScript
*   **State Management:** [Zustand](https://zustand-bear.github.io/blog/)
*   **Markdown Rendering:** `marked` and `marked-terminal`
*   **Utilities:** `dayjs` (date handling), `fuse.js` (fuzzy searching)
*   **Linting/Formatting:** `xo`, `prettier`
*   **Testing:** `ava`

## Architecture

The application follows a component-based architecture:

*   **`source/cli.tsx`**: The entry point, which renders the main `App` component using Ink.
*   **`source/app.tsx`**: The main application component, responsible for the overall layout (list pane, preview pane, instruction area) and global terminal effects.
*   **`source/components/`**: Contains various UI components like `ListPane`, `PreviewPane`, and `Instruction`.
*   **`source/hooks/`**: Custom React hooks for managing specific application logic, such as `useNavigation` (handling keybindings and application flow), `useDimension`, `useDebounce`, and `usePreviewNavigation`.
*   **`source/store/index.ts`**: Implements global state management using Zustand, holding data like the notes list, selected note, preview content, focus state, and application mode.
*   **`source/helper/`**: Utility functions for file operations (`file.ts`), opening external editors (`editor.ts`), searching (`search.ts`), date formatting (`date.ts`), and theme management (`theme.ts`).
*   **`source/theme/`**: Manages the application's theming system, defining various color schemes.

## Building and Running

To set up and run the project:

1.  **Installation:**
    ```bash
    yarn install
    ```
2.  **Building:** Compiles the TypeScript source code into JavaScript.
    ```bash
    yarn build
    ```
3.  **Running:** Starts the TUI application.
    ```bash
    yarn start
    ```
4.  **Development:** Runs the application in watch mode using `tsx`.
    ```bash
    yarn dev
    ```

## Testing

To run tests and lint checks:

```bash
yarn test
```

This command performs:
*   Prettier check (`prettier --check .`)
*   XO linting (`xo`)
*   Ava unit tests (`ava`)

## Development Conventions

*   **Code Formatting:** Enforced using Prettier. Configuration in `.prettierrc` specifies no semicolons (`semi: false`), single quotes (`singleQuote: true`), and a print width of 80 characters (`printWidth: 80`).
*   **Linting:** Handled by XO, extending `eslint-config-xo-react`.
*   **TypeScript:** Uses `@sindresorhus/tsconfig` for base configuration.

## Keybindings

`note-tui` supports common Vim-like keybindings for efficient navigation and interaction. Refer to the `readme.md` for a detailed list of keybindings for `Idle Mode`, `Trash Mode`, and `Search Mode`.
