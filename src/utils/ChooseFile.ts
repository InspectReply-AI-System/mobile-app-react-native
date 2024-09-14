import { Alert, Linking } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { permissionComponent } from './permissions';
import { CommonStrings } from './stringsUtils';

const showError = (type: number) => {
  Alert.alert(
    CommonStrings.alertTitle,
    type === 1
      ? CommonStrings.cameraAccessDenied
      : CommonStrings.galleryAccessDenied,
    [
      {
        text: CommonStrings.goToSetting,
        onPress: () => {
          Linking.openSettings()
            .then(() => {})
            .catch(() => {});
        },
      },
      {
        style: 'destructive',
        text: 'Cancel',
      },
    ],
  );
};

let imageOptions: any = {
  width: 500,
  height: 500,
  cropping: true,
  mediaType: 'photo',
  showCropGuidelines: false,
  freeStyleCropEnabled: true,
};
const launchCamera = async (successCallback: any, failureCallback: any) => {
  permissionComponent.Camera(
    async (status: any) => {
      if (status) {
        try {
          const result: any = await ImageCropPicker.openCamera(imageOptions);
          if (result?.size > 5000010) {
            failureCallback({ message: CommonStrings.fileSizeTooBig });
          } else {
            successCallback(result);
          }
        } catch (error: any) {
          failureCallback(error);
        }
      } else {
        showError(1);
        failureCallback();
      }
    },
    () => {},
  );
};

const lauchGallery = async (successCallback: any, failureCallback: any) => {
  permissionComponent.Gallery(
    async (status: any) => {
      if (status) {
        try {
          const result: any = await ImageCropPicker.openPicker(imageOptions);
          if (result?.size > 5000010) {
            failureCallback({ message: CommonStrings.fileSizeTooBig });
          } else {
            successCallback(result);
          }
        } catch (error: any) {
          failureCallback(error);
        }
      } else {
        showError(2);
        failureCallback();
      }
    },
    () => {},
  );
};
export { launchCamera, lauchGallery };
