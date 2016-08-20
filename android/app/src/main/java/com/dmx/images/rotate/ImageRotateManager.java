package com.dmx.images.rotate;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

public class ImageRotateManager extends ReactContextBaseJavaModule {
    public ImageRotateManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void rotateImageInFile(String path, Promise promise) {
        Bitmap bitmap = null;
        try {
            path = path.replace("file://", "");
            FileInputStream fileInputStream = new FileInputStream(path);
            InputStream inputStream = new BufferedInputStream(fileInputStream);
            bitmap = BitmapFactory.decodeStream(inputStream);
            fileInputStream.close();
            inputStream.close();

            float originalWidth = bitmap.getWidth();
            float originalHeight = bitmap.getHeight();

            // No rotation necessary, return original dimensions
            
            WritableMap map = Arguments.createMap();
            map.putDouble("width", originalWidth);
            map.putDouble("height", originalHeight);

            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        } finally {
            if (bitmap != null) {
                bitmap.recycle();
            }
        }
    }

    @Override
    public String getName() {
        return "ImageRotateManager";
    }
}
