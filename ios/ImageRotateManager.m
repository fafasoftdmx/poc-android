#import "ImageRotateManager.h"
#import "RCTLog.h"
#import <UIKit/UIKit.h>

@implementation ImageRotateManager

RCT_EXPORT_MODULE();

- (UIImage *)rotateImage:(UIImage *)image {
  UIImageOrientation newOrientation;
  switch (image.imageOrientation) {
    case UIImageOrientationUp:
      newOrientation = UIImageOrientationLeft;
      break;
    case UIImageOrientationLeft:
      break;
    case UIImageOrientationDown:
      newOrientation = UIImageOrientationRight;
      break;
    case UIImageOrientationRight:
      break;
  }
  UIImage *rotatedImage = [UIImage imageWithCGImage:image.CGImage scale:1.0f orientation:newOrientation];
  return rotatedImage;
}

RCT_EXPORT_METHOD(rotateImageInFile:(NSString *)path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSData *fileData = [NSData dataWithContentsOfFile:path];
  UIImage *image = [[UIImage alloc] initWithData:fileData];

  UIImage *rotatedImage = [self rotateImage:image];
  NSData *imageData = UIImageJPEGRepresentation(rotatedImage, 1);
  [imageData writeToFile:path atomically:YES];

  NSDictionary *response = @{
    @"width" : [NSNumber numberWithFloat: rotatedImage.size.width],
    @"height" : [NSNumber numberWithFloat: rotatedImage.size.height]
  };

  resolve(response);
}

@end
