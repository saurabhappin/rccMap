#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

//import Google Maps
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Initialize Google Maps
  // This should always be the first call of the method
  [GMSServices provideAPIKey:@"AIzaSyDVkjN_Q4Y0JZu5BnY1OYUh6MFsE6PXiLA"];

  if (@available(iOS 13.0, *)) {
    UIView* statusBar = [[UIView alloc] initWithFrame:[UIApplication sharedApplication].statusBarFrame];
    statusBar.backgroundColor = [UIColor clearColor];
    [[UIApplication sharedApplication].keyWindow addSubview:statusBar];
  }

  self.moduleName = @"rccMap";

  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
