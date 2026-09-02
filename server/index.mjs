import { createApp } from './app.mjs';
import { loadServerConfig } from './config.mjs';

const config = loadServerConfig();
const app = createApp({ config });
const server = app.listen(config.port, () => {
  console.info(`CR-1 production server listening on port ${config.port}.`);
});

function shutdown(signal) {
  console.info(`${signal} received. Closing HTTP server.`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
