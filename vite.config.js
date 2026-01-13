import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        id: "com.focusflow.app",
        name: 'FocusFlow',
        short_name: 'FocusFlow',
        description: 'Premium Focus Timer & Habit Tracker for deep work sessions.',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        dir: 'ltr',
        lang: 'en',
        categories: ['productivity', 'utilities', 'lifestyle'],
        prefer_related_applications: false,
        display_override: ['window-controls-overlay', 'minimal-ui'],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
             src: 'pwa-512x512.png',
             sizes: '512x512',
             type: 'image/png',
             purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshot-mobile.png',
            sizes: '1024x1024',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Focus Timer Mobile View'
          },
          {
            src: 'screenshot-desktop.png',
            sizes: '1024x1024',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Dashboard Desktop View'
          }
        ],
        shortcuts: [
          {
            name: "Focus Mode",
            short_name: "Focus",
            description: "Start a deep work session",
            url: "/?mode=focus",
            icons: [{ src: "pwa-192x192.png", sizes: "192x192" }]
          }
        ],
        launch_handler: {
          client_mode: "auto"
        }
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      },
      devOptions: {
        enabled: true
      }
    }),
  ],
});
