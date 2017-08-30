import ReactTest from './src/Index';

/*
TIPS:

Folder src vsebuje glavno komponento(ocitno se pri reactu gre vse z komponentami)

Glavni file je: Test.js

Prvih 11 vrstic je navaden import, kjer se importajo vse potrebne knjiznice(ce
  se pac uporablja kaka druga Componenta se je pac dopise)

File style.js: vsebuje react-natives css.. kako tocno deluje se sam nwm, mam pa
  premal prakse da bi kj povedau (npr: kako lepo izpisat te button da ni tko
  cez ceu zaslon)

InpuButtons.js je sam testni, ni pa uporablje za main apk
Copy- backup

ostali folderji nas vec ali manj ne zanimajo
// node_modules: look at npmjs.com; so pa vsi moduli ki jih zinstalira in
 se mozni ki jih lahko mi damo ali ne ob npm install blabla --save
// package.json : vsebuje informacijo o vseh moduilh ki so gor
// .{neki} razne nastavitve za vsak nek program funkcijio...
// ios/android: predvidevam da so tle podatki za laufanje na android/ios

*/


/*
Navodila:

https://facebook.github.io/react-native/docs/getting-started.html

zinstaliraj vse potrebno (jst nism uspeu usposodobit emulatorja)
zato za android sledi:

https://facebook.github.io/react-native/docs/running-on-device.html

//vklopi usb debugging, ob povezavi s kablom izberi pa za prenos podatkov


//za delovanje: 2 terminala

1. (konstantno laufa): react-native start

2. (le na zacetku oz ob posodabljanju): react-native run-android
alias runAndroid="react-native run-android"
ce noces vsakic na spremembo resetirati stvar, potem potresi telefon oz
klikni na menu in enable hot reloading

ce kj novega pogruntate se javim :P


naj pa nekdo pogrunta kako se nastavi da je na gitu/redmine pa posreduje info

!!!!!!!APK
za andoird nalaganje:
https://facebook.github.io/react-native/docs/signed-apk-android.html#content

cd android && ./gradlew assembleRelease
The generated APK can be found under android/app/build/outputs/apk/app-release.apk

za debugging live
<!- START -->
//signingConfigs {
//    release {
//        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
//            storeFile file(MYAPP_RELEASE_STORE_FILE)
//            storePassword MYAPP_RELEASE_STORE_PASSWORD
//            keyAlias MYAPP_RELEASE_KEY_ALIAS
//            keyPassword MYAPP_RELEASE_KEY_PASSWORD
//        }
//    }
//}
splits {
    abi {
        reset()
        enable enableSeparateBuildPerCPUArchitecture
        universalApk false  // If true, also generate a universal APK
        include "armeabi-v7a", "x86"
    }
}
buildTypes {
    release {
        minifyEnabled enableProguardInReleaseBuilds
        proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        //signingConfig signingConfigs.release
    }
}
<!- END -->

za release
<!- START -->
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}
splits {
    abi {
        reset()
        enable enableSeparateBuildPerCPUArchitecture
        universalApk false  // If true, also generate a universal APK
        include "armeabi-v7a", "x86"
    }
}
buildTypes {
    release {
        //minifyEnabled enableProguardInReleaseBuilds
        //proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        signingConfig signingConfigs.release
    }
}
<!- END -->



*/
