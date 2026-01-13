# 🚀 How to Publish FocusFlow to Google Play Store

Since **FocusFlow** is a Progressive Web App (PWA), the modern way to publish it to the Google Play Store is using a **Trusted Web Activity (TWA)**. This requires **no Java/Kotlin coding**.

---

## ✅ Phase 1: Host Your App (Required)

The Play Store requires your app to be live on a secure (HTTPS) URL.

1.  **Deploy the App**: Use Vercel, Netlify, or your preferred hosting.
    - _If using Vercel/Netlify:_ Drag and drop the `dist` folder created by `npm run build`.
2.  **Verify URL**: Ensure you can open `https://your-app-url.com` on your phone and it works.

---

## 📦 Phase 2: Generate Android Package (Easy Method)

We will use **PWABuilder** to wrap your website into an Android App Bundle (`.aab`) which Google requires.

1.  Go to **[PWABuilder.com](https://www.pwabuilder.com/)**.
2.  Enter your live URL (from Phase 1).
3.  Click **Start**.
4.  Once analyzed, click **Package for Stores** > **Android**.
5.  **Fill in Details**:
    - **Package ID**: `com.focusflow.app` (or similar unique ID)
    - **App Name**: FocusFlow
    - **Launcher Icon**: Upload `public/pwa-512x512.png` if asked (usually it pulls from site).
6.  **Signing Key**:
    - **Important**: PWABuilder can generate a signing key for you. **DOWNLOAD THIS KEY AND KEEP IT SAFE.** You will need it to update the app in the future.
    - If you lose this key, you can never update your app on the store again.
7.  **Download**: Click **Generate** and download the `.zip` file.
    - Inside you will find an **`.aab` (App Bundle)** file.

---

## 🔐 Phase 3: Digital Asset Links (Verification)

Google needs to prove you own the website you are wrapping.

1.  Extract the zip file from Step 2. Focus on the `assetlinks.json` file provided.
2.  You must upload this file to your website at this exact path:
    ```
    https://your-app-url.com/.well-known/assetlinks.json
    ```
    - _Note: If using Vercel, put this file in the `public/.well-known/` folder of your project code and redeploy._

---

## 🏪 Phase 4: Google Play Console

1.  **Sign up**: Go to [Google Play Console](https://play.google.com/console). (One-time $25 fee).
2.  **Create App**:
    - Select **App** (not Game).
    - Select **Free**.
3.  **Dashboard**: Follow the "Set up your app" checklist (Privacy Policy, App Access, Content Ratings, etc.).
    - _Privacy Policy:_ You need a URL. For now, you can generate a free one online or point to a simple page on your site.
4.  **Production Track**:
    - Go to **Production** > **Create new release**.
    - Upload the **`.aab`** file you downloaded from PWABuilder.
5.  **Store Listing**: Upload screenshots and your 512x512 icon.

## 🎉 Done!

Submit for review. It usually takes 1-3 days for approval.

---

### 💡 Pro Tip for Updates

Because this is a PWA, **you don't need to submit a new version to the Play Store for code changes!**
Just redeploy your website (e.g., `npm run build` and push to Vercel), and users will automatically see the new version when they open the app.
You only need to update the Play Store build if you change the App Icon, Name, or native configurations.
