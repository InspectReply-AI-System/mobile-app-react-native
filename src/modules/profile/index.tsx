import React, { useEffect } from 'react';
import Column from '@inspectreplyai/components/general/Column';
import CustomHeader from '@inspectreplyai/components/header';
import {
  CommonFunctions,
  CommonStrings,
  normalize,
} from '@inspectreplyai/utils';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import { useRefs, useSimpleReducer } from '@inspectreplyai/hooks';
import {
  emailValidation,
  fullNameValidation,
  passwordValidation,
} from '@inspectreplyai/utils/validatorsUtils';
import eye from '@inspectreplyai/assets/svg/eye.svg';
import Device from '@inspectreplyai/utils/Device';
import { isIOS } from '@inspectreplyai/utils/platform';
import Row from '@inspectreplyai/components/general/Row';
import { ActivityIndicator, Alert, Text } from 'react-native';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { BlurView } from '@react-native-community/blur';
import Modal from 'react-native-modal';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';
import { Icons, Images } from '@inspectreplyai/themes/appImages';
import styles from './styles';
import { lauchGallery, launchCamera } from '@inspectreplyai/utils/ChooseFile';
import ImageView from 'react-native-image-viewing';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import {
  setProfileImage,
  updateProfile,
} from '@inspectreplyai/redux/auth/action';
import { RootState } from '@inspectreplyai/redux/Store';
import { StoreActions } from '@inspectreplyai/utils/Enums';
import { reset } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import { showErrorToast } from '@inspectreplyai/components/toast';
import ImageWrapper from '@inspectreplyai/components/general/Image';

const Profile = () => {
  const [state, updateState] = useSimpleReducer({
    name: '',
    email: '',
    password: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    profileImage: '',
    secureText: true,
    isModalVisible: false,
    isEditableEnable: false,
    isPreviewEnable: false,
  });
  const {
    name,
    email,
    password,
    nameError,
    emailError,
    profileImage,
    passwordError,
    secureText,
    isModalVisible,
    isPreviewEnable,
    isEditableEnable,
  } = state;

  const dispatch = useAppDispatch();

  const { setRef, focusOnElement } = useRefs();
  const { user, loading } = useAppSelector(
    (store: RootState) => store.AuthSlice,
  );

  useEffect(() => {
    updateState({
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
      password: '',
      profileImage: { path: user?.profilePhoto },
    });
  }, []);

  const validateAndUpdateState = (
    field: string,
    value: string,
    validationFn: (input: string) => { errorMsg: string },
  ) => {
    const error = validationFn(value.trim()).errorMsg;
    updateState({
      [field]: value,
      [`${field}Error`]: error,
    });
  };

  const onEnterName = (name: string) => {
    validateAndUpdateState('name', name, (name) => fullNameValidation(name));
  };

  const onEnterEmail = (email: string) => {
    validateAndUpdateState('email', email, emailValidation);
  };

  const onEnterPassword = (password: string) => {
    const passwordError = passwordValidation(password.trim()).errorMsg;
    updateState({
      password,
      passwordError,
    });
  };

  const onPressEye = () => {
    updateState({ secureText: !secureText });
  };

  const onPressDeleteProfile = () => {
    updateState({ isModalVisible: true });
  };

  const onPressCross = () => {
    updateState({ isModalVisible: false });
  };

  const onPressEdit = () => {
    updateState({ isEditableEnable: !isEditableEnable });
  };

  const onPressTerms = () => {};

  const onPressPrivacy = () => {};

  const handleImagePicker = () => {
    Alert.alert('Select Image Source', 'Choose from gallery or camera', [
      {
        text: 'Camera',
        onPress: () =>
          launchCamera(
            (response: any) => {
              updateState({ profileImage: response });
            },
            () => {},
          ),
      },
      {
        text: 'Gallery',
        onPress: () =>
          lauchGallery(
            (response: any) => {
              updateState({ profileImage: response });
            },
            (err: any) => {
              if (err.message === CommonStrings.fileSizeTooBig) {
                CommonFunctions.showSnackbar(CommonStrings.imageIsTooBig);
              }
            },
          ),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const onPressProfile = () => {
    if (profileImage?.path) {
      updateState({ isPreviewEnable: true });
    } else {
      if (isEditableEnable) {
        handleImagePicker();
      }
    }
  };

  const onPressSave = () => {
    const getName = CommonFunctions.getFirstAndLastName(name);
    const payload = {
      cust_id: user?.userId,
      first_name: getName?.firstName,
      last_name: getName?.lastName,
      email: email,
      status: 1,
    };
    const profilePayload = {
      profilePhoto: profileImage?.path,
      cust_id: user?.userId,
    };
    dispatch(setProfileImage({ profilePayload, customerId: user?.userId }));
    dispatch(
      updateProfile({
        payload,
        customerId: user?.userId,
        successCallBack: () => {
          updateState({ isEditableEnable: false });
        },
        errorCallBack: (error) => {
          showErrorToast(error);
        },
      }),
    );
  };

  const onPressLogout = () => {
    dispatch({ type: StoreActions.RESET_STORE });
    reset(ROUTES.AUTHNAVIGATOR);
  };

  return (
    <Column style={styles.container}>
      <CustomHeader
        rightIcon={Icons.edit}
        title={CommonStrings.myProfile}
        onRightPress={onPressEdit}
        customRightIconStyle={styles.headerIconStyle}
      />
      <Touchable
        disabled={profileImage?.path || isEditableEnable ? false : true}
        style={styles.imageContainer}
        onPress={onPressProfile}>
        <ImageWrapper
          source={
            profileImage?.path
              ? { uri: profileImage?.path }
              : Images.dummyProfile
          }
          style={styles.imageStyle}
        />
      </Touchable>

      <ImageView
        images={[
          {
            uri: profileImage?.path,
          },
        ]}
        imageIndex={0}
        visible={isPreviewEnable}
        animationType={'slide'}
        onRequestClose={() => updateState({ isPreviewEnable: false })}
      />

      <Modal
        isVisible={isModalVisible}
        hasBackdrop
        style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        useNativeDriver
        backdropOpacity={1}
        customBackdrop={
          <BlurView style={styles.blurView} blurType='dark' blurAmount={4} />
        }
        animationIn='fadeIn'
        animationOut='fadeOut'>
        <Column style={styles.modalContentContainer}>
          <Row style={{ justifyContent: 'space-between' }}>
            <ImageWrapper source={Images.redInfo} style={styles.modalInfo} />
            <Touchable onPress={onPressCross}>
              <ImageWrapper
                source={Icons.cross}
                style={styles.modalCrossIcon}
              />
            </Touchable>
          </Row>

          <Column style={{ marginTop: normalize(12) }}>
            <Text style={styles.deleteProfile}>
              {CommonStrings.deleteProfile}
            </Text>
            <Text style={styles.deleteDesc}>
              {CommonStrings.deleteProfileDesc}
            </Text>
          </Column>
          <PrimaryButton
            title={CommonStrings.confirm}
            onPress={() => {}}
            containerStyle={styles.confirmButtonView}
          />
          <PrimaryButton
            title={CommonStrings.cancel}
            onPress={() => {}}
            containerStyle={styles.cancelButtonView}
          />
        </Column>
      </Modal>

      <Column style={styles.inputsContainer}>
        <ScrollContainer showsVerticalScrollIndicator={false}>
          <CustomInput
            label={CommonStrings.name}
            placeholder={CommonStrings.name}
            ref={setRef(CommonStrings.name)}
            onSubmitEditing={() => {
              focusOnElement('Email');
            }}
            autoFocus
            value={name}
            maxLength={300}
            isError={nameError}
            returnKeyType='next'
            onChangeText={onEnterName}
            editable={isEditableEnable}
            onBlur={() => onEnterName(name)}
          />
          <CustomInput
            label={CommonStrings.email}
            ref={setRef(CommonStrings.email)}
            placeholder={CommonStrings.emailExample}
            keyboardType='email-address'
            onSubmitEditing={() => {
              focusOnElement(CommonStrings.password);
            }}
            value={email}
            maxLength={320}
            returnKeyType='next'
            autoCapitalize='none'
            isError={emailError}
            onChangeText={onEnterEmail}
            editable={isEditableEnable}
            onBlur={() => onEnterEmail(email)}
          />
          <CustomInput
            maxLength={25}
            RightIcon={eye}
            value={password}
            returnKeyType='done'
            isError={passwordError}
            onSubmitEditing={() => {}}
            secureTextEntry={secureText}
            keyboardType='ascii-capable'
            onRightIconPress={onPressEye}
            onChangeText={onEnterPassword}
            label={CommonStrings.password}
            editable={isEditableEnable}
            placeholder={CommonStrings.password}
            ref={setRef(CommonStrings.password)}
            onBlur={() => onEnterPassword(password)}
            returnKeyLabel={isIOS ? 'done' : 'submit'}
          />
          {isEditableEnable && (
            <PrimaryButton title={CommonStrings.save} onPress={onPressSave} />
          )}
          <Touchable
            style={{ marginTop: normalize(36) }}
            onPress={onPressLogout}>
            <Text style={styles.logoutText}>{CommonStrings.logout}</Text>
          </Touchable>
          <Row style={styles.termsView}>
            <Touchable onPress={onPressTerms}>
              <Text style={styles.termsText}>{CommonStrings.terms}</Text>
            </Touchable>
            <Column style={styles.seperatorView} />
            <Touchable onPress={onPressPrivacy}>
              <Text style={styles.privacyText}>{CommonStrings.privacy}</Text>
            </Touchable>
            <Column style={styles.seperatorView} />
            <Text style={styles.privacyText}>{`v${Device.getVersion()}`}</Text>
          </Row>
          <Touchable
            style={{ marginTop: normalize(36) }}
            onPress={onPressDeleteProfile}>
            <Text style={styles.deleteText}>{CommonStrings.deleteProfile}</Text>
          </Touchable>
        </ScrollContainer>
        {loading && (
          <Column style={styles.loaderStyle}>
            <ActivityIndicator size={'large'} />
          </Column>
        )}
      </Column>
    </Column>
  );
};

export default Profile;
