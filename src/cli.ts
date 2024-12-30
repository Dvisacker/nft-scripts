#!/usr/bin/env node
import { Command } from 'commander';
import { mintNFTs } from './mint';

const program = new Command();

program
    .name('nft-mass-minter')
    .description('NFT tools')
    .version('1.0.0');

program
    .command('mint')
    .description('Mint NFTs using parameters from .env file')
    .action(async () => {
        try {
            await mintNFTs();
        } catch (error) {
            console.error('Failed to mint NFTs:', error);
            process.exit(1);
        }
    });

program.parse();
