import { Alert, Text } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { styles } from './styles';
import CityList from './cityList';
import StateList from './stateList';
import Modal from 'react-native-modal';
import CategoryList from './categoryList';
import { validationSchema } from '../data';
import { Formik, FormikProps } from 'formik';
import {
  bottomSheetProps,
  FormValues,
  RouteParams,
  SelectCity,
  StateSelect,
} from './@types';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import {
  contractorProfilePhoto,
  deleteContractor,
  getContractorProfile,
  registerContractor,
  updateContractorProfile,
} from '@inspectreplyai/network/contractorAPis';
import { useRefs } from '@inspectreplyai/hooks';
import { BlurView } from '@react-native-community/blur';
import Row from '@inspectreplyai/components/general/Row';
import { colors, typography } from '@inspectreplyai/themes';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { goBack } from '@inspectreplyai/utils/navigationUtils';
import { RouteProp, useRoute } from '@react-navigation/native';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import { getStates } from '@inspectreplyai/redux/contractor/action';
import RNBottomSheet from '@inspectreplyai/components/rnBottomSheet';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { setContentType } from '@inspectreplyai/network/networkServices';
import { Icons, Images, SvgIcon } from '@inspectreplyai/themes/appImages';
import CustomLoader from '@inspectreplyai/components/loader/customLoader';
import { CommonFunctions, CommonStrings, vh } from '@inspectreplyai/utils';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import { lauchGallery, launchCamera } from '@inspectreplyai/utils/ChooseFile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomProfileInput from '@inspectreplyai/components/textInputs/profileInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ContractorDetails = () => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const { setRef, focusOnElement } = useRefs();
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState({});
  const formRef = useRef<FormikProps<FormValues>>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { states } = useAppSelector((store) => store.contractorSlice);
  const inset = useSafeAreaInsets();
  const [profileData, setProfileData] = useState({
    contractorName: '',
    company: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    zip: '',
    website: '',
    contractor_id: '',
    status: '',
    category: {
      category_name: '',
      _id: '',
    },
    city: {
      name: '',
      _id: '',
    },
    state: {
      name: '',
      _id: '',
      abbreviation: '',
    },
  });

  const bottomSheetRef = useRef<bottomSheetProps>(null);
  const bottomSheetRef1 = useRef<bottomSheetProps>(null);
  const bottomSheetRef2 = useRef<bottomSheetProps>(null);

  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { id } = route.params ?? { isNew: false };
  const [isNewContractor, setIsNewContractor] = useState(
    route.params?.isNew || false,
  );

  const getContractorData = async () => {
    try {
      const response = await getContractorProfile({ contractor_id: id });
      setLoader(false);
      const contractor = response?.data?.contractor;
      setProfileData({
        contractorName: contractor?.contractor_name,
        company: contractor?.company_name,
        email: contractor?.email,
        phone: contractor?.phone,
        address1: contractor?.address_1,
        address2: contractor?.address_2,
        zip: contractor?.zip_code,
        website: contractor?.website,
        contractor_id: contractor?._id,
        status: contractor?.status,
        category: {
          category_name: contractor?.category?.category_name || '',
          _id: contractor?.category?._id || '',
        },
        city: {
          name: contractor?.city.name || '',
          _id: contractor?.city_id || '',
        },
        state: {
          name: contractor?.state.name || '',
          _id: contractor?.state_id || '',
          abbreviation:
            states?.find((state) => state._id === contractor?.state_id)
              ?.abbreviation || '',
        },
      });
      if (contractor?.profilePhoto) {
        setProfileImage({
          path: contractor?.profilePhoto
            ? `${contractor.base_url}${contractor?.profilePhoto}`
            : '',
        });
      }
    } catch (error) {
      setLoader(false);
      showErrorToast(error?.message);
    }
  };

  useEffect(() => {
    if (isNewContractor) {
      setEditMode(true);
    } else {
      setLoader(true);
      dispatch(getStates());
      getContractorData();
    }
  }, []);

  const { user } = useAppSelector((store) => store.AuthSlice);

  const openCategorySheet = useCallback(() => {
    if (editMode && bottomSheetRef.current) {
      bottomSheetRef.current.openSheet();
    }
  }, [editMode]);

  const onSelectCategory = (category: {
    category_name: string;
    _id: string;
  }) => {
    formRef?.current?.setFieldValue('category', {
      category_name: category.category_name || '',
      _id: category._id || '',
    });
    if (bottomSheetRef.current) {
      bottomSheetRef.current.closeSheet();
    }
  };

  const openStateSheet = useCallback(() => {
    if (editMode && bottomSheetRef1.current) {
      bottomSheetRef1.current.openSheet();
    }
  }, [editMode]);
  const onSelectState = (state: StateSelect) => {
    formRef?.current?.setFieldValue('state', {
      name: state?.name,
      _id: state?._id,
      abbreviation: state?.abbreviation,
    });
    formRef?.current?.setFieldValue('city', {
      name: '',
      _id: '',
    });
    formRef?.current?.setFieldValue('zip', '');

    if (bottomSheetRef1.current) {
      bottomSheetRef1.current.closeSheet();
    }
  };

  const openCitySheet = useCallback(() => {
    if (!formRef.current?.values?.state?._id) {
      showErrorToast(CommonStrings.selectCityFirst);
      return;
    }
    if (editMode && bottomSheetRef2.current) {
      bottomSheetRef2.current.openSheet();
    }
  }, [editMode]);
  const onSelectCity = (city: SelectCity) => {
    formRef?.current?.setFieldValue('city', {
      name: city?.name,
      _id: city?._id,
    });
    formRef?.current?.setFieldValue('zip', '');

    if (bottomSheetRef2.current) {
      bottomSheetRef2.current.closeSheet();
    }
  };

  const handleImagePicker = () => {
    Alert.alert(
      CommonStrings.selectImageSource,
      CommonStrings.choosefromGalleryOrCamera,
      [
        { text: CommonStrings.camera, onPress: () => openCamera() },
        { text: CommonStrings.gallery, onPress: () => openGallery() },
        { text: CommonStrings.cancel, style: 'cancel' },
      ],
    );
  };

  const openCamera = () => {
    launchCamera(
      (response: any) => {
        setProfileImage(response);
      },
      () => {},
    );
  };

  const openGallery = () => {
    lauchGallery(
      (response: any) => {
        setProfileImage(response);
      },
      (err: any) => {
        if (err.message === CommonStrings.largeFile) {
          CommonFunctions.showSnackbar(CommonStrings.imageIsTooBig);
        }
      },
    );
  };

  const submitForm = async (formData: any) => {
    const params = {
      customer: user?.userId,
      contractor_name: formData.contractorName,
      company_name: formData.company,
      email: formData.email,
      phone: formData.phone,
      address_1: formData.address1,
      address_2: formData.address2,
      city: formData.city._id,
      state: formData.state._id,
      zip_code: formData.zip,
      category: formData.category?._id,
      website: formData.website,
      ...(!isNewContractor && {
        contractor_id: profileData?.contractor_id,
        status: 1,
      }),
    };
    setLoader(true);
    setContentType(null);
    try {
      if (isNewContractor) {
        const result = await registerContractor(params);
        setProfileData({
          ...profileData,
          contractor_id: result?.data?.contractor?.id,
        });
        showSuccessToast(result?.data?.message);
        try {
          if (profileImage?.path) {
            await contractorProfilePhoto({
              profileDetails: profileImage,
              contractor_id: result?.data?.contractor?.id,
            });
          }
          setContentType(null);
          setLoader(false);
          setEditMode(false);
          setIsNewContractor(false);
        } catch (error: any) {
          showErrorToast(error);
          setLoader(false);
          setContentType(null);
        }
      } else {
        const result = await updateContractorProfile(params);
        try {
          if (profileImage?.path) {
            await contractorProfilePhoto({
              profileDetails: profileImage,
              contractor_id: profileData?.contractor_id,
            });
          }
          setContentType(null);
          setEditMode(false);
          setLoader(false);
        } catch (error: any) {
          showErrorToast(error);
          setContentType(null);
          setLoader(false);
        }
        showSuccessToast(result?.data?.message);
      }
    } catch (error: any) {
      showErrorToast(error);
      setLoader(false);
    }
  };

  const onPressEdit = async (
    validateForm: () => Promise<any>,
    handleSubmit: () => void,
  ) => {
    if (editMode) {
      const errors = await validateForm();
      if (Object.keys(errors).length === 0) {
        handleSubmit();
      } else {
        Object.keys(errors).forEach((field) => {
          formRef?.current?.setFieldTouched(field, true);
        });
        formRef?.current?.setErrors(errors);
      }
    } else {
      setEditMode(true);
    }
  };

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onDeleteContractor = async () => {
    handleModal();
    setLoader(true);
    try {
      const result = await deleteContractor({
        contractor_id: profileData?.contractor_id,
      });
      showSuccessToast(result?.data?.message);
      setLoader(false);
      goBack();
    } catch (error: any) {
      showErrorToast(error);
      setLoader(false);
    }
  };

  return (
    <Column style={styles.container}>
      <Formik
        innerRef={formRef}
        initialValues={{
          contractorName: profileData?.contractorName,
          company: profileData?.company,
          email: profileData?.email,
          phone: profileData.phone.toString(),
          address1: profileData.address1,
          address2: profileData.address2,
          city: profileData.city,
          state: profileData.state,
          zip: profileData.zip,
          category: profileData.category,
          website: profileData.website,
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          submitForm(values);
          setSubmitting(false);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          validateForm,
        }) => (
          <>
            <CustomHeader
              title={
                isNewContractor
                  ? CommonStrings.newContractor
                  : profileData.contractorName
              }
              titleCustomStyle={{ textAlign: 'center' }}
              leftIcon={<SvgIcon.BackIcon />}
              rightIcon={!editMode && !isNewContractor && <SvgIcon.Edit />}
              rightLabel={
                editMode && !isNewContractor ? CommonStrings.save : ''
              }
              onRightPress={() => onPressEdit(validateForm, handleSubmit)}
              onPressRightLabel={() => onPressEdit(validateForm, handleSubmit)}
              disabled={false}
            />

            <KeyboardAwareScrollView
              contentContainerStyle={styles.form}
              showsVerticalScrollIndicator={false}>
              <Touchable
                disabled={!editMode}
                style={styles.profileImageView}
                onPress={handleImagePicker}>
                <ImageWrapper
                  source={
                    profileImage?.path
                      ? { uri: profileImage?.path }
                      : Images.dummyProfile
                  }
                  style={styles.profileImage}
                />
                {editMode && (
                  <ImageWrapper
                    source={Icons.plusIcon}
                    style={styles.plusIconStyle}
                  />
                )}
              </Touchable>

              <CustomProfileInput
                label={CommonStrings.contractorName}
                value={values.contractorName}
                onChangeText={handleChange(CommonStrings.contractorname)}
                onBlur={handleBlur(CommonStrings.contractorname)}
                editable={editMode}
                isEdit={editMode}
                isError={errors.contractorName}
                touched={Boolean(touched.contractorName)}
                ref={setRef(CommonStrings.contractorName)}
                onSubmitEditing={() => {
                  focusOnElement(CommonStrings.company);
                }}
              />
              <CustomProfileInput
                label={CommonStrings.companyName}
                value={values.company}
                onChangeText={handleChange(CommonStrings.company.toLowerCase())}
                onBlur={handleBlur(CommonStrings.company.toLowerCase())}
                editable={editMode}
                isEdit={editMode}
                isError={errors.company}
                touched={Boolean(touched.company)}
                ref={setRef(CommonStrings.company)}
                onSubmitEditing={() => {
                  focusOnElement(CommonStrings.email);
                }}
              />
              <CustomProfileInput
                label={CommonStrings.email}
                value={values.email}
                onChangeText={handleChange(CommonStrings.email.toLowerCase())}
                onBlur={handleBlur(CommonStrings.email.toLowerCase())}
                editable={editMode}
                isEdit={editMode}
                isError={errors.email}
                keyboardType='email-address'
                touched={Boolean(touched.email)}
                ref={setRef(CommonStrings.email)}
                onSubmitEditing={() => {
                  focusOnElement(CommonStrings.phone);
                }}
              />
              <CustomProfileInput
                label={CommonStrings.phone}
                value={values.phone}
                onChangeText={handleChange(CommonStrings.phone.toLowerCase())}
                onBlur={handleBlur(CommonStrings.phone.toLowerCase())}
                editable={editMode}
                isEdit={editMode}
                isError={errors.phone}
                keyboardType='number-pad'
                ref={setRef(CommonStrings.phone)}
                onSubmitEditing={() => {
                  focusOnElement(CommonStrings.address1);
                }}
                touched={Boolean(touched.phone)}
                maxLength={10}
              />
              <CustomProfileInput
                label={CommonStrings.address1}
                value={values.address1}
                onChangeText={handleChange(CommonStrings.addressOne)}
                onBlur={handleBlur(CommonStrings.addressOne)}
                editable={editMode}
                isEdit={editMode}
                isError={errors.address1}
                ref={setRef(CommonStrings.address1)}
                touched={Boolean(touched.address1)}
                onSubmitEditing={() => {
                  focusOnElement(CommonStrings.address2);
                }}
              />
              <CustomProfileInput
                label={CommonStrings.address2}
                value={values.address2}
                onChangeText={handleChange(CommonStrings.addressTwo)}
                onBlur={handleBlur(CommonStrings.addressTwo)}
                editable={editMode}
                isEdit={editMode}
                isError={errors.address2}
                touched={Boolean(touched.address2)}
                ref={setRef(CommonStrings.address2)}
                onSubmitEditing={() => {
                  focusOnElement(CommonStrings.website);
                }}
              />

              <Column style={styles.categoryContainer}>
                <Text style={[typography.h7, styles.label]}>
                  {CommonStrings.state}
                </Text>
                {editMode ? (
                  <Touchable onPress={openStateSheet}>
                    <Row
                      style={[
                        styles.categorySubContainer,
                        errors?.state?.name &&
                          Boolean(touched.state) && { borderColor: colors.red },
                      ]}>
                      <Text style={typography.body}>{values?.state?.name}</Text>
                      <SvgIcon.DownArrow />
                    </Row>
                  </Touchable>
                ) : (
                  <Row style={styles.categorySubContainer}>
                    <Text style={[typography.body, styles.input]}>
                      {values?.state?.name}
                    </Text>
                  </Row>
                )}
                {errors?.state?.name && Boolean(touched.state) && (
                  <Text style={styles.errorText}>{errors?.state?.name}</Text>
                )}
              </Column>

              <Column style={styles.categoryContainer}>
                <Text style={[typography.h7, styles.label]}>
                  {CommonStrings.city}
                </Text>
                {editMode ? (
                  <Touchable onPress={openCitySheet}>
                    <Row
                      style={[
                        styles.categorySubContainer,
                        errors?.city?.name &&
                          Boolean(touched.city) && { borderColor: colors.red },
                      ]}>
                      <Text style={typography.body}>{values.city?.name}</Text>
                      <SvgIcon.DownArrow />
                    </Row>
                  </Touchable>
                ) : (
                  <Row style={styles.categorySubContainer}>
                    <Text style={[typography.body, styles.input]}>
                      {values?.city?.name}
                    </Text>
                  </Row>
                )}
                {errors?.city?.name && Boolean(touched.city) && (
                  <Text style={styles.errorText}>{errors?.city.name}</Text>
                )}
              </Column>

              <CustomProfileInput
                label={CommonStrings.zip}
                value={values.zip}
                onChangeText={handleChange(CommonStrings.zip.toLowerCase())}
                onBlur={handleBlur(CommonStrings.zip.toLowerCase())}
                editable={editMode}
                isEdit={editMode}
                isError={errors.zip}
                touched={Boolean(touched.zip)}
                keyboardType='phone-pad'
              />

              <Column style={styles.categoryContainer}>
                <Text style={[typography.h7, styles.label]}>
                  {CommonStrings.category}
                </Text>
                {editMode ? (
                  <Touchable onPress={openCategorySheet}>
                    <Row
                      style={[
                        styles.categorySubContainer,
                        errors?.category?.category_name &&
                          Boolean(touched.category) && {
                            borderColor: colors.red,
                          },
                      ]}>
                      <Text style={typography.body}>
                        {values?.category?.category_name}
                      </Text>
                      <SvgIcon.DownArrow />
                    </Row>
                  </Touchable>
                ) : (
                  <Row style={styles.categorySubContainer}>
                    <Text style={[typography.body, styles.input]}>
                      {values?.category?.category_name}
                    </Text>
                  </Row>
                )}
                {errors?.category?.category_name &&
                  Boolean(touched.category) && (
                    <Text style={styles.errorText}>
                      {errors?.category?.category_name}
                    </Text>
                  )}
              </Column>
              <CustomProfileInput
                label={CommonStrings.website}
                value={values.website}
                onChangeText={handleChange(CommonStrings.web)}
                onBlur={handleBlur(CommonStrings.web)}
                editable={editMode}
                isEdit={editMode}
                isError={errors.website}
                ref={setRef(CommonStrings.website)}
                touched={Boolean(touched.website)}
              />
            </KeyboardAwareScrollView>
            <Column style={{ marginBottom: vh(inset.bottom + 32) }}>
              {!isNewContractor ? (
                editMode && (
                  <PrimaryButton
                    title={CommonStrings.deleteContractor}
                    onPress={handleModal}
                    containerStyle={{ backgroundColor: colors.red }}
                  />
                )
              ) : (
                <PrimaryButton
                  title={CommonStrings.addContractor}
                  onPress={() => onPressEdit(validateForm, handleSubmit)}
                  containerStyle={{ backgroundColor: colors.primaryBlue }}
                />
              )}
            </Column>
            <RNBottomSheet ref={bottomSheetRef}>
              <CategoryList onSelectCategory={onSelectCategory} />
            </RNBottomSheet>
            <RNBottomSheet ref={bottomSheetRef1}>
              <StateList onSelectState={onSelectState} />
            </RNBottomSheet>
            <RNBottomSheet ref={bottomSheetRef2}>
              <CityList sateData={values.state} onSelectCity={onSelectCity} />
            </RNBottomSheet>
          </>
        )}
      </Formik>
      <Modal
        isVisible={isModalVisible}
        hasBackdrop
        useNativeDriverForBackdrop
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modalView}
        useNativeDriver
        backdropOpacity={1}
        customBackdrop={
          <BlurView style={styles.blurView} blurType='dark' blurAmount={4} />
        }
        animationIn='fadeIn'
        animationOut='fadeOut'>
        <Column style={styles.modalContentContainer}>
          <Text style={[typography.h5, styles.deleteDesc]}>
            {CommonStrings.deleteContractor}
          </Text>
          <Text style={[typography.body, styles.deleteDesc]}>
            {CommonStrings.deleteContractorText}
          </Text>

          <PrimaryButton
            title={CommonStrings.delete}
            onPress={onDeleteContractor}
            containerStyle={styles.confirmButtonView}
          />
          <PrimaryButton
            title={CommonStrings.cancel}
            onPress={() => setIsModalVisible(false)}
            containerStyle={styles.cancelButtonView}
          />
        </Column>
      </Modal>
      {loader && <CustomLoader customContainerStyle={styles.loaderStyle} />}
    </Column>
  );
};

export default ContractorDetails;
