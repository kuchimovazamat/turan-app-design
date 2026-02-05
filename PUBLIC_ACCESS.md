# 🌍 Make Your App Publicly Accessible

## Method 1: Cloudflare Tunnel (Recommended - Most Reliable)

### Step 1: Install Cloudflare Tunnel
```bash
# macOS (using Homebrew)
brew install cloudflared

# Or download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
```

### Step 2: Start Your Dev Server
```bash
npm run dev
```
**Wait for**: `Local: http://localhost:8080/`

### Step 3: Create Public Tunnel (In a NEW Terminal)
```bash
cloudflared tunnel --url http://localhost:8080
```

### Step 4: Share the URL
You'll see output like:
```
Your quick Tunnel has been created!
Visit it at (it may take some time to be reachable):
https://random-word-1234.trycloudflare.com
```

**Share this URL with your clients!** 🎉

---

## Method 2: ngrok (Alternative)

### Step 1: Install ngrok
```bash
# macOS (using Homebrew)
brew install ngrok

# Or download from: https://ngrok.com/download
```

### Step 2: Start Your Dev Server
```bash
npm run dev
```

### Step 3: Create Public Tunnel (In a NEW Terminal)
```bash
ngrok http 8080
```

### Step 4: Share the URL
Look for the line that says:
```
Forwarding    https://abc123.ngrok.io -> http://localhost:8080
```

**Share the ngrok URL with your clients!** 🎉

---

## Method 3: Local Network (WiFi Only)

### Step 1: Get Your Local IP Address
```bash
# macOS
ipconfig getifaddr en0
```
You'll get something like: `192.168.1.100`

### Step 2: Start Your Dev Server
```bash
npm run dev
```

### Step 3: Share the Local URL
Your clients must be on the **same WiFi network**.
Share: `http://192.168.1.100:8080`

---

## 📱 How Clients Access Your App

1. You send them the public URL (e.g., `https://random-word.trycloudflare.com`)
2. They open it in any browser on any device
3. They can see your app in real-time!
4. Any changes you make will auto-refresh for them ✨

## ⚠️ Important Notes

- **Keep both terminals open** (dev server + tunnel)
- URL changes each time you restart the tunnel
- Perfect for demos and testing
- Not for production use

## 🚀 For Permanent Hosting

Deploy to Vercel/Netlify for a permanent URL:
```bash
npm run build
# Then deploy the 'dist' folder
```
