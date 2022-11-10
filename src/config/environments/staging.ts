export default {
  hostName: process.env.HOST_NAME || 'http://localhost:21465',
  web: {
    port: process.env.PORT || 21465,
  },
  api: {
  },
  webhook: {
    active: process.env.WEBHOOK_ACTIVE || false,
    url: process.env.WEBHOOK_URL || undefined,
  },
};
