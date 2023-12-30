import app from './app';
 import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(
        `ZenithZephyr Course Review App Reviewing on port ${config.port}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`UnhandledRejection is Detected , Closing down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`UncaughtException is Detected , Closing down ...`);
  process.exit(1);
});
