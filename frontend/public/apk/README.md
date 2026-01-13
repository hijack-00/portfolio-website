# APK Files Directory

This directory should contain APK files for all mobile applications.

## Required APK Files

Place your compiled APK files here with the following filenames:

- `anibhavi-creation.apk` - Anibhavi Creation App
- `anibhavi-admin.apk` - Anibhavi Admin Panel
- `3d-mockup-clothing.apk` - 3D Mockup Clothing App
- `listify.apk` - Listify Service Booking App
- `kyuon.apk` - Kyuon Social Media App
- `coch-ai.apk` - Coch AI Training Platform
- `kvs.apk` - KVS EMI Management App
- `aot-encyclopedia.apk` - AOT Encyclopedia App
- `loan-app.apk` - Loan Application App
- `whispr.apk` - Whispr Anonymous Chat App
- `luvnestor-pro.apk` - Luvnestor Professional
- `luvnestor.apk` - Luvnestor App

## How APK Downloads Work

When a user clicks the **[DOWNLOAD]** button for a mobile app project:
1. The browser will download the APK file
2. User can install it on their Android device
3. Installation may require enabling "Install from Unknown Sources"

## APK File Guidelines

1. **File Size**: Keep APK files optimized (avoid bloat)
2. **Signing**: Ensure APKs are properly signed
3. **Version**: Use latest stable version
4. **Name Format**: Use lowercase with hyphens (as listed above)

## Placeholder

Until you add actual APK files, the DOWNLOAD button will still appear but may show a 404 error when clicked.

## Adding APK Files

1. Build your Flutter/React Native app in release mode
2. Sign the APK if needed
3. Rename to match the filenames above
4. Place in this directory
5. Test the download button on the portfolio

## Alternative: External Hosting

If APK files are large, you can:
- Host on Google Drive/Dropbox
- Use GitHub Releases
- Use a CDN
- Update the `link` property in `page.tsx` with the external URL
