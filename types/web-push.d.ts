declare module "web-push" {
  type VapidDetails = {
    subject: string;
    publicKey: string;
    privateKey: string;
  };

  interface SendNotificationOptions {
    TTL?: number;
    vapidDetails?: VapidDetails;
    headers?: Record<string, string>;
  }

  function setVapidDetails(
    subject: string,
    publicKey: string,
    privateKey: string,
  ): void;
  function sendNotification(
    subscription: any,
    payload: string,
    options?: SendNotificationOptions,
  ): Promise<any>;

  const webpush: {
    setVapidDetails: typeof setVapidDetails;
    sendNotification: typeof sendNotification;
  };

  export default webpush;
}
