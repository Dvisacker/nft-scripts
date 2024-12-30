# NFT Mass Minter

A script to mint many NFTs

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Copy the environment file and fill in your values:
```bash
cp .env.example .env
```

## Configuration

Edit `.env` file with your details:
- `PRIVATE_KEY`: Your wallet's private key
- `RESERVOIR_API_KEY`: Your Reservoir API key (optional but recommended)
- `RPC_URL`: Ethereum RPC URL (e.g., from Alchemy or Infura)
- `COLLECTION_ADDRESS`: NFT collection address to mint from
- `QUANTITY_TO_MINT`: Number of NFTs to mint
- `MAX_ETH_PER_TOKEN`: Maximum ETH price per token

## Usage

Run the minter:
```bash
npm start
```

## Development

- Format code: `npm run format`
- Lint code: `npm run lint`
- Fix linting issues: `npm run lint:fix`
- Build: `npm run build` 