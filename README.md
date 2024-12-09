# Craftzing Design Tokens Example

This repository uses [Style Dictionary](https://amzn.github.io/style-dictionary/#/) to manage and transform design tokens into platform-specific styles. The design tokens are synced using [Token Studio](https://www.tokens.studio/), ensuring consistency across platforms.

### Key Directories

- **`build/`**: Contains the generated output files for each platform (CSS, SCSS, JS).
- **`token-studio/`**: Source of design tokens in JSON format, synced via Token Studio.
- **`lib/`**: Includes project-specific scripts and utilities.

## Getting Started

### Prerequisites

- Node.js
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies

```bash
pnpm install
```

## Usage

### Build Design Tokens

Run the following command to generate platform-specific styles:

```bash
pnpm run build
```

This will:

1. Clean all previous builds.
2. Generate token files in the build/ directory.

## File Outputs

- CSS: `build/css/tokens.css`
- SCSS: `build/scss/tokens.scss`
- JavaScript: `build/js/tokens.js`
