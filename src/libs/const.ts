import type { Address } from 'viem';

const {
  NODE_ENV,
  NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_SOCKET_URL,
  NEXT_PUBLIC_TWITTER_CLIENT_ID,
  NEXT_PUBLIC_TWITTER_CLIENT_SECRET,
  NEXT_PUBLIC_SIGN_MESSAGE_WALLET,
  NEXT_PUBLIC_CHAIN_ID,
  NEXT_PUBLIC_CHAIN_RPC_URL,
  NEXT_PUBLIC_USE_TESTNET,
  NEXT_PUBLIC_SMART_CONTRACT_ADDRESS,
} = process.env;

export const env = {
  isProduction: NODE_ENV === 'production',

  APP_URL: NEXT_PUBLIC_APP_URL ?? 'https://staging.og-battle-ai.var-meta.com',
  API_URL: NEXT_PUBLIC_API_URL ?? 'https://api.staging.flofin.myrcvr.com',
  APP_SOCKET_URL: NEXT_PUBLIC_APP_SOCKET_URL ?? '',

  TWITTER_CLIENT_ID: NEXT_PUBLIC_TWITTER_CLIENT_ID ?? '',
  TWITTER_CLIENT_SECRET: NEXT_PUBLIC_TWITTER_CLIENT_SECRET ?? '',

  SIGN_MESSAGE_WALLET: NEXT_PUBLIC_SIGN_MESSAGE_WALLET ?? '',

  CHAIN_ID: NEXT_PUBLIC_CHAIN_ID ? Number(NEXT_PUBLIC_CHAIN_ID) : 16600,
  CHAIN_RPC_URL: NEXT_PUBLIC_CHAIN_RPC_URL ?? 'https://evmrpc-testnet.0g.ai',
};

export const LAST_MONTH = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

export const isServer = typeof window === 'undefined';

export const useTestnet =
  NEXT_PUBLIC_USE_TESTNET ? NEXT_PUBLIC_USE_TESTNET === 'true' : true;

export const AVATAR_PROFILE_RANDOMS = [
  'https://battle-of-ai-agents.s3.ap-southeast-1.amazonaws.com/dev/profile-images/goat.png',
  'https://battle-of-ai-agents.s3.ap-southeast-1.amazonaws.com/dev/profile-images/dog.png',
];

export const SMART_CONTRACT_ADDRESS = (
  NEXT_PUBLIC_SMART_CONTRACT_ADDRESS ??
  '0xA1ef2b6d1B4cd00324Cc8BFD4F6B521418aCf1cA'
) as Address;
