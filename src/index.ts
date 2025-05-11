import { UI } from './module';

// Create and start the UI
const ui = new UI();

// Handle graceful shutdown
process.on('SIGINT', () => {
  ui.close();
  process.exit(0);
});

// Start the application
ui.start().catch(error => {
  console.error('Error starting the application:', error);
  process.exit(1);
});