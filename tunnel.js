#!/usr/bin/env node
import localtunnel from 'localtunnel';

const PORT = 8080;

(async () => {
  console.log('\n🌍 Creating public tunnel...\n');
  
  try {
    const tunnel = await localtunnel({ 
      port: PORT,
      subdomain: 'turan-app' // Try to get a custom subdomain
    });

    console.log('✅ Tunnel created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📱 Share this URL with your clients:');
    console.log(`🔗 ${tunnel.url}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('⚠️  Keep this terminal open while clients test the app');
    console.log('⚠️  Press Ctrl+C to stop the tunnel\n');

    tunnel.on('close', () => {
      console.log('\n❌ Tunnel closed');
      process.exit();
    });

    tunnel.on('error', (err) => {
      console.error('❌ Tunnel error:', err.message);
      process.exit(1);
    });

  } catch (err) {
    console.error('❌ Failed to create tunnel:', err.message);
    process.exit(1);
  }
})();
