package com.dmx;

import com.dmx.AudioRecorder.AudioRecorderPackage;
import com.dmx.images.resize.ImageResizePackage;
import com.dmx.images.rotate.ImageRotatePackage;
import com.facebook.react.ReactActivity;
import com.rnfs.RNFSPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import android.content.Intent;
import android.content.res.Configuration;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.yoloci.fileupload.FileUploadPackage;
import com.dmx.RNVinScanner.RNVinScannerPackage;
import com.zmxv.RNSound.RNSoundPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "dmx";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSBundleFile() {
        return CodePush.getBundleUrl();
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
      mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(this);
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNFSPackage(),
            new OrientationPackage(this),
            new RCTCameraPackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY, this, BuildConfig.DEBUG),
            new AudioRecorderPackage(),
            new RNSoundPackage(),
            mReactNativePushNotificationPackage,
            new RNDeviceInfo(),
            new FileUploadPackage(),
            new ImageResizePackage(),
            new ImageRotatePackage(),
            new RNVinScannerPackage(this)
        );
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

    @Override
    protected void onNewIntent (Intent intent) {
      super.onNewIntent(intent);

      mReactNativePushNotificationPackage.newIntent(intent);
    }

}
