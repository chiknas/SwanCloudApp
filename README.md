# SwanCloudApp

## Useful Commands

1. Trigger background fetch event
   `adb shell cmd jobscheduler run -f com.swancloudapp 999`

2. Find app pid by package (Android)
   `adb shell pidof com.swancloudapp`

3. Get live logs on app (Android)
   `adb logcat --pid=<pid number here>`
