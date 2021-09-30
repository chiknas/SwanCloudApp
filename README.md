# SwanCloudApp ![CircleCI Build Status](https://img.shields.io/circleci/build/github/chiknas/SwanCloudApp)

Swan cloud app written in React Native to accompany the [Swancloud API](https://github.com/chiknas/SwanCloudServer). Get the an APK from the latest build in [CircleCI](https://app.circleci.com/pipelines/github/chiknas/SwanCloudApp).   

## Dev Environment Setup

Restarting the machine might be necessary between installation steps

1. Setup React Native environment from [here](https://reactnative.dev/docs/environment-setup)
  * you dont have to install android studio. download sdkmanager from [here](https://developer.android.com/studio) (scroll all the way down to 'Command line tools only' section)
  * [sdkmanager docs](https://developer.android.com/studio/command-line/sdkmanager)

2. Install [NodeJS](https://nodejs.org/en/download/)
3. Install yarn `npm install --global yarn`
4. Connect android device with devmode on and run `yarn android`
5. To generate an apk run `yarn android:release`

## Useful Commands

1. Trigger background fetch event
   `adb shell cmd jobscheduler run -f com.swancloudapp 999`

2. Find app pid by package (Android)
   `adb shell pidof com.swancloudapp`

3. Get live logs on app (Android)
   `adb logcat --pid=<pid number here>`
