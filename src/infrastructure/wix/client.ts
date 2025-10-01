import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

type WixClientType = ReturnType<typeof createClient>;

let wixClientInstance: WixClientType | null = null;

export const getWixClient = async (): Promise<WixClientType> => {
  if (wixClientInstance) {
    return wixClientInstance;
  }

  wixClientInstance = createClient({
    modules: { items },
    auth: OAuthStrategy({ clientId: process.env.WIX_CLIENT_ID! }),
  });

  return wixClientInstance;
};

