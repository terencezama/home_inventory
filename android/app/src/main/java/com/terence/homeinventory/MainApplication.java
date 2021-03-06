package com.terence.homeinventory;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.calendarevents.CalendarEventsPackage;
import com.terence.homeinventory.BuildConfig;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.rnfs.RNFSPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

//        @Override
//        protected String getJSBundleFile() {
//        return CodePush.getJSBundleFile();
//        }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SvgPackage(),
            SendSMSPackage.getInstance(),
            new ReactNativeContacts(),
            new PickerPackage(),
            new CalendarEventsPackage(),
            new VectorIconsPackage(),
            new RNLanguagesPackage(),
            new RNGestureHandlerPackage(),
            new RNFSPackage(),
            new RNFirebasePackage(),
              new RNFirebaseAnalyticsPackage(),
              new RNFirebaseAuthPackage(),
              new RNFirebaseFirestorePackage(),
              new RNFirebaseStoragePackage()


      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
