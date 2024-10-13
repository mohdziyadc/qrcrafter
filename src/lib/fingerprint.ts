import { ClientJS } from "clientjs";

declare global {
  var cachedClient: ClientJS | undefined;
}

export function getFingerprintClient() {
  if (typeof window === undefined) {
    return null;
  }
  if (process.env.NODE_ENV === "production") {
    return new ClientJS();
  } else {
    if (!global.cachedClient) {
      global.cachedClient = new ClientJS();
    }
    return global.cachedClient;
  }
}
