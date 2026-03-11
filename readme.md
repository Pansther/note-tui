# note-tui

A terminal user interface (TUI) application for managing notes. `note-tui` provides a clean and efficient way to interact with your notes directly from the command line, featuring a split-pane view for note listing and content preview, with full Markdown support.

## Features

- **Split-Pane Interface**: Dedicated panes for listing notes and previewing their content.
- **Markdown Support**: Render your notes with full Markdown syntax highlighting.
- **Intuitive Navigation**: Easily browse, select, and view notes using keyboard shortcuts.
- **Themable**: Customize the application's appearance to your preference.

## Installation

To install `note-tui`, make sure you have Node.js (version 16 or higher) and Yarn installed.

```bash
git clone https://github.com/your-username/note-tui.git # Replace with actual repo URL
cd note-tui
yarn install
yarn build
```

## Usage

To start the `note-tui` application, run:

```bash
yarn start
```

## Keybindings

`note-tui` supports common Vim-like keybindings for efficient navigation and interaction within the application. This includes familiar keys like `j`, `k` for vertical movement, `h`, `l` for horizontal focus changes, and `g`, `G` for quick jumps to the top or bottom of a list.

### Idle Mode

| Key     | Description     |
| :------ | :-------------- |
| ↓/j     | down            |
| ↑/k     | up              |
| ←/h     | focus note      |
| →/l     | focus preview   |
| tab     | toggle focus    |
| <C-d>   | scroll down     |
| <C-u>   | scroll up       |
| g       | go top          |
| G       | go bottom       |
| e/enter | edit            |
| n       | create note     |
| s/(/)   | search          |
| d       | archived        |
| t       | open trash view |
| </>     | change theme    |
| q/<C-c> | exit            |

### Trash Mode

| Key   | Description  |
| :---- | :----------- |
| ↓/j   | down         |
| ↑/k   | up           |
| <C-d> | scroll down  |
| <C-u> | scroll up    |
| g     | go top       |
| G     | go bottom    |
| r     | restore note |
| d     | delete note  |
| s/(/) | search       |
| q/esc | back to note |

### Search Mode

| Key        | Description    |
| :--------- | :------------- |
| ↓          | down           |
| ↑          | up             |
| <C-u>      | clear          |
| return/esc | unfocus search |
| q/Ctrl + c | exit           |

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
