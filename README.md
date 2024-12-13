# Craftzing Design Tokens Example

This repository uses [Style Dictionary](https://amzn.github.io/style-dictionary/#/) to manage and transform design tokens into platform-specific styles. The design tokens are synced using [Token Studio](https://www.tokens.studio/), ensuring consistency across platforms.

### Key Directories

- **`dist/`**: Contains the generated output files for each platform (CSS, SCSS, JS).
- **`token-studio/`**: Source of design tokens in JSON format, synced via Token Studio.
- **`lib/`**: Includes project-specific scripts and utilities.

## Getting Started

### Prerequisites

- Node.js
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

```bash
git clone git@github.com:craftzing/craftzing-design-tokens-example.git
cd craftzing-design-tokens-example
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
2. Generate token files in the dist/ directory.

### Testing Design Tokens

Ensure the generated design tokens are accurate and reflect expected changes by running the test suite.

#### Run tests
To execute the tests and validate your tokens:

```bash
pnpm run test
```

#### Update tests

If your tokens have intentionally changed and you need to update the test snapshots:

```bash
pnpm run test --u
```

> **Tip:** Regularly run tests to track changes and ensure updates are intentional. Verify the changes before updating snapshots to avoid introducing unintended modifications.

## File Outputs

- CSS: `dist/css/tokens.css`
- SCSS: `dist/scss/tokens.scss`
- JavaScript: `dist/js/tokens.js`

## Figma Link
https://www.figma.com/design/daVJlWWwwrulalbC4LGMnf/Design-Tokens-Example?m=auto&t=pPQmTn84ub1togTX-6

I use this figma file, i'm terrible at figma so if you can improve it, feel free.
