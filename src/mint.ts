import { createClient } from '@reservoir0x/reservoir-sdk';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';
import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
    'PRIVATE_KEY',
    'RPC_URL',
    'COLLECTION_ADDRESS',
    'QUANTITY_TO_MINT',
    'MAX_ETH_PER_TOKEN',
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

const reservoirClient = createClient({
    chains: [
        {
            id: 1,
            baseApiUrl: 'https://api.reservoir.tools',
            active: true,
            name: 'mainnet',
        },
    ],
    apiKey: process.env.RESERVOIR_API_KEY,
});

// Create wallet client
const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

const walletClient = createWalletClient({
    account,
    chain: mainnet,
    transport: http(process.env.RPC_URL),
});

export async function mintNFTs() {
    const collectionAddress = process.env.COLLECTION_ADDRESS!;
    const quantityToMint = parseInt(process.env.QUANTITY_TO_MINT!);
    const maxETHperToken = parseFloat(process.env.MAX_ETH_PER_TOKEN!);

    // Validate parsed values
    if (isNaN(quantityToMint) || quantityToMint <= 0) {
        throw new Error('QUANTITY_TO_MINT must be a positive number');
    }

    if (isNaN(maxETHperToken) || maxETHperToken <= 0) {
        throw new Error('MAX_ETH_PER_TOKEN must be a positive number');
    }

    try {
        console.log(`Starting to mint ${quantityToMint} NFTs from collection ${collectionAddress}`);
        console.log(`Maximum ETH per token: ${maxETHperToken}`);

        // Prepare mint transaction
        await reservoirClient.actions.mintToken({
            items: [{ collection: collectionAddress, quantity: quantityToMint }],
            wallet: walletClient,
            onProgress: steps => {
                console.log(steps);
            },
            expectedPrice: {
                '0x0000000000000000000000000000000000000000': {
                    amount: maxETHperToken,
                    currencyAddress: '0x0000000000000000000000000000000000000000',
                    currencyDecimals: 18,
                },
            },
            chainId: 1,
            precheck: true,
        });

        console.log('Minting completed successfully!');
    } catch (error) {
        console.error('Error minting NFTs:', error);
        throw error;
    }
}
