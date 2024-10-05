import React, { useEffect } from 'react';
import Column from '@inspectreplyai/components/general/Column';
import CustomHeader from '@inspectreplyai/components/header';
import {
  CommonFunctions,
  CommonStrings,
  normalize,
} from '@inspectreplyai/utils';
import { useSimpleReducer } from '@inspectreplyai/hooks';
import {
  emailValidation,
  fullNameValidation,
} from '@inspectreplyai/utils/validatorsUtils';
import Device from '@inspectreplyai/utils/Device';
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
  deleteUser,
  setProfileImage,
  updateProfile,
} from '@inspectreplyai/redux/auth/action';
import { RootState } from '@inspectreplyai/redux/Store';
import { StoreActions } from '@inspectreplyai/utils/Enums';
import { navigate, reset } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import { showErrorToast } from '@inspectreplyai/components/toast';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import CustomProfileInput from '@inspectreplyai/components/textInputs/profileInput';
import { typography } from '@inspectreplyai/themes';
import Svg from '@inspectreplyai/components/general/Svg';
import DownArrow from '@inspectreplyai/assets/svg/downArrow.svg';

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
    nameError,
    emailError,
    profileImage,
    isModalVisible,
    isPreviewEnable,
    isEditableEnable,
  } = state;

  const dispatch = useAppDispatch();

  const { user, loading } = useAppSelector(
    (store: RootState) => store.AuthSlice,
  );

  useEffect(() => {
    updateState({
      name: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
      password: '',
      profileImage: { path: `${user?.base_url}${user?.profilePhoto}` },
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
    validateAndUpdateState('email', email, () =>
      emailValidation(
        email,
        email?.length === 0
          ? CommonStrings.pleaseEnterAnEmail
          : CommonStrings.pleaseEnterValidEmail,
      ),
    );
  };

  const onPressDeleteProfile = () => {
    updateState({ isModalVisible: true });
  };

  const onPressCross = () => {
    updateState({ isModalVisible: false });
  };

  const onPressEdit = () => {
    if (!isEditableEnable) {
      updateState({ isEditableEnable: !isEditableEnable });
    } else {
      onPressSave();
    }
  };

  const onPressTerms = () => {};

  const onPressPrivacy = () => {};

  const handleImagePicker = () => {
    Alert.alert(
      CommonStrings.selectImageSource,
      CommonStrings.choosefromGalleryOrCamera,
      [
        {
          text: CommonStrings.camera,
          onPress: () =>
            launchCamera(
              (response: any) => {
                updateState({ profileImage: response });
              },
              () => {},
            ),
        },
        {
          text: CommonStrings.gallery,
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
        { text: CommonStrings.cancel, style: 'cancel' },
      ],
    );
  };

  const onPressProfile = () => {
    if (profileImage?.path && !isEditableEnable) {
      updateState({ isPreviewEnable: true });
    } else if (!profileImage?.path && !isEditableEnable) {
      handleImagePicker();
    } else if (isEditableEnable) {
      handleImagePicker();
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
      profilePhoto: {
        uri: profileImage?.path,
        type: 'image/jpeg',
        name: 'profile-photo.jpg',
      },
      cust_id: user?.userId,
    };

    dispatch(
      updateProfile({
        payload,
        customerId: user?.userId,
        successCallBack: () => {
          if (profilePayload?.profilePhoto?.uri || profileImage?.path) {
            dispatch(
              setProfileImage({ profilePayload, customerId: user?.userId }),
            );
          }
          updateState({ isEditableEnable: false });
        },
        errorCallBack: (error) => {
          console.log('errorr', error);
          showErrorToast(error);
        },
      }),
    );
  };

  const onPressLogout = () => {
    dispatch({ type: StoreActions.RESET_STORE });
    reset(ROUTES.AUTHNAVIGATOR);
  };

  const onPressDeleteUser = () => {
    dispatch(
      deleteUser({
        cust_id: user?.userId,
        successCallBack: (response) => {
          if (response) {
            dispatch({ type: StoreActions.RESET_STORE });
            updateState({ isModalVisible: false });
            setTimeout(() => {
              reset(ROUTES.AUTHNAVIGATOR);
            }, 500);
          }
        },
        errorCallBack: (error) => {
          showErrorToast(error);
        },
      }),
    );
  };

  const onPressPassword = () => {
    navigate(ROUTES.PASSWORDSCREEN);
  };

  return (
    <Column style={styles.container}>
      <CustomHeader
        rightIcon={!isEditableEnable && Icons.edit}
        rightLabel={isEditableEnable && CommonStrings.save}
        title={CommonStrings.myProfile}
        onRightPress={onPressEdit}
        onPressRightLabel={onPressEdit}
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
        {isEditableEnable && (
          <ImageWrapper source={Icons.plusIcon} style={styles.plusIconStyle} />
        )}
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
            loading={loading}
            title={CommonStrings.confirm}
            onPress={onPressDeleteUser}
            containerStyle={styles.confirmButtonView}
          />
          <PrimaryButton
            title={CommonStrings.cancel}
            onPress={onPressCross}
            containerStyle={styles.cancelButtonView}
          />
        </Column>
      </Modal>

      <Column style={styles.inputsContainer}>
        <ScrollContainer showsVerticalScrollIndicator={false}>
          <CustomProfileInput
            value={name}
            touched={true}
            maxLength={300}
            isError={nameError}
            isEdit={isEditableEnable}
            label={CommonStrings.name}
            onChangeText={onEnterName}
            editable={isEditableEnable}
            onBlur={() => onEnterName(name)}
            inputCustomStyle={styles.inputStyle}
          />
          <CustomProfileInput
            value={email}
            touched={true}
            maxLength={320}
            isError={emailError}
            isEdit={isEditableEnable}
            label={CommonStrings.email}
            editable={isEditableEnable}
            keyboardType='email-address'
            onChangeText={onEnterEmail}
            onBlur={() => onEnterEmail(email)}
            inputCustomStyle={styles.inputStyle}
          />
          <Touchable style={styles.changePassword} onPress={onPressPassword}>
            <Text style={typography.body}>{CommonStrings.changePassword}</Text>
            <Svg Component={DownArrow} imageStyle={styles.arrowStyle} />
          </Touchable>
          <Column style={{ marginHorizontal: normalize(90) }}>
            <Touchable
              style={{ marginTop: normalize(45) }}
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
              <Text
                style={styles.privacyText}>{`v${Device.getVersion()}`}</Text>
            </Row>
            <Touchable
              style={{ marginTop: normalize(10) }}
              onPress={onPressDeleteProfile}>
              <Text style={styles.deleteText}>
                {CommonStrings.deleteProfile}
              </Text>
            </Touchable>
          </Column>
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
