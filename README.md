# Agnostric

It's a fork of the popular NOSTR client called JUMBLE, reimagined for lovers of cozy medieval gothic aesthetics.

## Run Locally

```bash
# Clone this repository
git clone https://github.com/mparfeniuk/agnostric.git

# Go into the repository
cd jumble

# Install dependencies
npm install

# Run the app
npm run dev
```

For a web-only build on a system that cannot download the Electron binary, skip that download while keeping platform-specific build dependencies such as Rollup:

```bash
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
npm run build
```

## Run Docker

```bash
# Clone this repository
git clone https://github.com/mparfeniuk/agnostric.git

# Go into the repository
cd jumble

# Run the docker compose
docker compose up --build -d
```

MIT
