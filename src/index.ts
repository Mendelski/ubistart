import { Application } from './app';
import './database/connect';

enum ExitStatus {
    Failure = 1,
    Success = 0,
}

const port = Number(process.env.PORT ?? 3000);
const app = new Application();

process.on('unhandledRejection', (reason, promise) => {
    console.error(`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`, reason);
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.error(`App exiting due to an uncaught exception: ${error}`);
    process.exit(ExitStatus.Failure);
});

app.start(port);
