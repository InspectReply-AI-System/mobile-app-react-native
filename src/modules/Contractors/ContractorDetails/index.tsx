import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, Image, Alert, Text } from 'react-native';

import { Formik } from 'formik';
import { colors, typography } from '@inspectreplyai/themes';
import { CommonFunctions, CommonStrings, vh } from '@inspectreplyai/utils';
import Edit from '@inspectreplyai/assets/svg/edit.svg';
import Save from '@inspectreplyai/assets/svg/saveEdit.svg';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import BackIcon from '@inspectreplyai/assets/svg/backIcon.svg';
import DownArrow from '@inspectreplyai/assets/svg/downArrow.svg';
import Touchable from '@inspectreplyai/components/general/Touchable';

import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import CustomProfileInput from '@inspectreplyai/components/textInputs/profileInput';
import Row from '@inspectreplyai/components/general/Row';
import { styles } from './styles';
import { validationSchema } from '../data';
import RNBottomSheet from '@inspectreplyai/components/rnBottomSheet';
import CategoryList from './categoryList';
import {
  getContractorProfile,
  registerContractor,
  updateContractorProfile,
} from '@inspectreplyai/network/contractorAPis';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';
import { useAppSelector } from '@inspectreplyai/hooks/reduxHooks';
import { goBack } from '@inspectreplyai/utils/navigationUtils';
import { lauchGallery, launchCamera } from '@inspectreplyai/utils/ChooseFile';
import { useRoute } from '@react-navigation/native';
import StateList from './stateList';
import CityList from './cityList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '@inspectreplyai/components/general/Loader';

const ContractorDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    category_name: 'Select Category',
    _id: '',
  });
  const [selectedState, setSelectedState] = useState({
    name: 'Select State',
    _id: '',
    abbreviation: '',
  });
  const [selectedCity, setSelectedCity] = useState({
    name: 'Select City',
    _id: '',
  });
  const formRef = useRef(null);
  const [profileData, setProfileData] = useState({
    company: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    zip: '',
    website: '',
    contractor_id: '',
    status: '',
  });

  const bottomSheetRef = useRef<{
    openSheet: () => void;
    closeSheet: () => void;
  } | null>(null);
  const bottomSheetRef1 = useRef<{
    openSheet: () => void;
    closeSheet: () => void;
  } | null>(null);
  const bottomSheetRef2 = useRef<{
    openSheet: () => void;
    closeSheet: () => void;
  } | null>(null);
  const route = useRoute();
  const { isNew, id } = route.params ?? { isNew: false };

  const getContractorData = async () => {
    try {
      const response = await getContractorProfile({ contractor_id: id });
      const contractor = response?.data?.contractor;
      setProfileData({
        company: contractor?.company_name,
        email: contractor?.email,
        phone: contractor?.phone,
        address1: contractor?.address_1,
        address2: contractor?.address_2,
        zip: contractor?.zip_code,
        website: contractor?.website,
        contractor_id: contractor?._id,
        status: contractor?.status,
      });
      setSelectedCategory({
        category_name: contractor?.category?.category_name || '',
        _id: contractor?.category?._id || '',
      });
      setSelectedCity({
        name: contractor?.city || '',
        _id: contractor?.city_id || '',
      });
      setSelectedState({
        name: contractor?.state || '',
        _id: contractor?.state_id || '',
        abbreviation: 'MO',
      });
    } catch (error) {
      showErrorToast(error?.message);
    }
  };

  useEffect(() => {
    if (isNew) {
      setEditMode(true);
    } else {
      getContractorData();
    }
  }, []);

  const { user } = useAppSelector((store) => store.AuthSlice);

  const openCategorySheet = useCallback(() => {
    if (editMode && bottomSheetRef.current) {
      bottomSheetRef.current.openSheet();
    }
  }, [editMode]);

  const onSelectCategory = (
    categoryName: string,
    categoryId: string,
    setFieldValue: any,
  ) => {
    formRef?.current?.setFieldValue('category', {
      category_name: categoryName || '',
      _id: categoryId || '',
    });
    if (bottomSheetRef.current) {
      bottomSheetRef.current.closeSheet();
    }
    setFieldValue('category', categoryName);
  };

  const openStateSheet = useCallback(() => {
    if (editMode && bottomSheetRef1.current) {
      bottomSheetRef1.current.openSheet();
    }
  }, [editMode]);
  const onSelectState = (state: {
    name: string;
    _id: string;
    abbreviation: string;
  }) => {
    formRef?.current?.setFieldValue('state', {
      name: state?.name,
      _id: state?._id,
      abbreviation: state?.abbreviation,
    });
    if (bottomSheetRef1.current) {
      bottomSheetRef1.current.closeSheet();
    }
  };

  const openCitySheet = useCallback(() => {
    if (editMode && bottomSheetRef2.current) {
      bottomSheetRef2.current.openSheet();
    }
  }, [editMode]);
  const onSelectCity = (city: { name: string; _id: string }) => {
    formRef?.current?.setFieldValue('city', {
      name: city?.name,
      _id: city?._id,
    });
    if (bottomSheetRef2.current) {
      bottomSheetRef2.current.closeSheet();
    }
  };

  const handleImagePicker = () => {
    Alert.alert('Select Image Source', 'Choose from gallery or camera', [
      { text: 'Camera', onPress: () => openCamera() },
      { text: 'Gallery', onPress: () => openGallery() },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = () => {
    launchCamera(
      (response: any) => {
        setProfileImage(response?.path);
      },
      () => {},
    );
  };

  const openGallery = () => {
    lauchGallery(
      (response: any) => {
        setProfileImage(response?.path);
      },
      (err: any) => {
        if (err.message === 'File size to big') {
          CommonFunctions.showSnackbar(CommonStrings.imageIsTooBig);
        }
      },
    );
  };

  const submitForm = async (formData: any) => {
    const newProfileData = {
      customer: user?.userId,
      contractor_name: 'Abhi12',
      company_name: formData.company,
      email: formData.email,
      phone: formData.phone,
      address_1: formData.address1,
      address_2: formData.address2,
      city: selectedCity._id,
      state: selectedState._id,
      zip_code: formData.zip,
      category: selectedCategory?._id,
      website: formData.website,
    };
    const updateProfileData = {
      contractor_id: profileData?.contractor_id,
      customer: user?.userId,
      contractor_name: 'Abhi12',
      company_name: formData.company,
      email: formData.email,
      phone: formData.phone,
      address_1: formData.address1,
      address_2: formData.address2,
      city: selectedCity._id,
      state: selectedState._id,
      zip_code: formData.zip,
      category: selectedCategory?._id,
      website: formData.website,
      status: profileData?.status,
    };
    try {
      if (isNew) {
        const result = await registerContractor(newProfileData);
        showSuccessToast(result?.data?.message);
        goBack();
      } else {
        const result = await updateContractorProfile(updateProfileData);
        showSuccessToast(result?.data?.message);
        goBack();
      }
    } catch (error) {
      showErrorToast(error);
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
        console.log('Validation errors: ', errors);
      }
    } else {
      setEditMode(true);
    }
  };

  return (
    <Column style={styles.container}>
      <Formik
        innerRef={formRef}
        initialValues={{
          company: profileData?.company,
          email: profileData?.email,
          phone: profileData.phone.toString(),
          address1: profileData.address1,
          address2: profileData.address2,
          city: selectedCity.name,
          state: selectedState.name,
          zip: profileData.zip,
          category: selectedCategory.category_name,
          website: profileData.website,
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await submitForm(values);
            setEditMode(false);
          } catch (error) {
            // Optionally handle error
          } finally {
            setSubmitting(false);
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          validateForm,
          setFieldValue,
        }) => (
          <>
            <CustomHeader
              title='Chuck Smith'
              leftIcon={<BackIcon />}
              rightIcon={!editMode ? <Edit /> : <Save />}
              onRightPress={() => onPressEdit(validateForm, handleSubmit)}
              disabled={false}
            />

            <KeyboardAwareScrollView
              contentContainerStyle={styles.form}
              showsVerticalScrollIndicator={false}>
              {editMode ? (
                <Touchable
                  style={styles.profileImageView}
                  onPress={handleImagePicker}>
                  <Image
                    source={
                      profileImage
                        ? { uri: profileImage }
                        : require('@inspectreplyai/assets/images/appIcon.png')
                    }
                    style={styles.profileImage}
                  />
                </Touchable>
              ) : (
                <Column style={styles.profileImageView}>
                  <Image
                    source={
                      profileImage
                        ? { uri: profileImage }
                        : require('@inspectreplyai/assets/images/appIcon.png')
                    }
                    style={styles.profileImage}
                  />
                </Column>
              )}

              <CustomProfileInput
                label={CommonStrings.company}
                value={values.company}
                onChangeText={handleChange(CommonStrings.company.toLowerCase())}
                onBlur={handleBlur(CommonStrings.company.toLowerCase())}
                editable={editMode}
                isEdit={editMode}
                isError={errors.company}
                touched={Boolean(touched.company)}
              />
              <CustomProfileInput
                label={CommonStrings.email}
                value={values.email}
                onChangeText={handleChange(CommonStrings.email.toLowerCase())}
                onBlur={handleBlur(CommonStrings.email.toLowerCase())}
                editable={editMode}
                isEdit={editMode}
                isError={errors.email}
                touched={Boolean(touched.email)}
              />
              <CustomProfileInput
                label={CommonStrings.phone}
                value={values.phone}
                onChangeText={handleChange(CommonStrings.phone.toLowerCase())}
                onBlur={handleBlur(CommonStrings.phone.toLowerCase())}
                editable={editMode}
                isEdit={editMode}
                isError={errors.phone}
                touched={Boolean(touched.phone)}
                maxLength={10}
              />
              <CustomProfileInput
                label={CommonStrings.address1}
                value={values.address1}
                onChangeText={handleChange('address1')}
                onBlur={handleBlur('address1')}
                editable={editMode}
                isEdit={editMode}
                isError={errors.address1}
                touched={Boolean(touched.address1)}
              />
              <CustomProfileInput
                label={CommonStrings.address2}
                value={values.address2}
                onChangeText={handleChange('address2')}
                onBlur={handleBlur('address2')}
                editable={editMode}
                isEdit={editMode}
                isError={errors.address2}
                touched={Boolean(touched.address2)}
              />

              <Column style={styles.categoryContainer}>
                <Text style={[typography.h7, styles.label]}>
                  {CommonStrings.city}
                </Text>
                {editMode ? (
                  <Touchable onPress={openCitySheet}>
                    <Row style={styles.categorySubContainer}>
                      <Text style={typography.body}>{values.city.name}</Text>
                    </Row>
                  </Touchable>
                ) : (
                  <Row style={styles.categorySubContainer}>
                    <Text style={[typography.body, styles.input]}>
                      {values.city.name}
                    </Text>
                  </Row>
                )}
              </Column>

              <Column style={styles.categoryContainer}>
                <Text style={[typography.h7, styles.label]}>
                  {CommonStrings.state}
                </Text>
                {editMode ? (
                  <Touchable onPress={openStateSheet}>
                    <Row style={styles.categorySubContainer}>
                      <Text style={typography.body}>{values.state.name}</Text>
                    </Row>
                  </Touchable>
                ) : (
                  <Row style={styles.categorySubContainer}>
                    <Text style={[typography.body, styles.input]}>
                      {values.state.name}
                    </Text>
                  </Row>
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
              />

              <Column style={styles.categoryContainer}>
                <Text style={[typography.h7, styles.label]}>
                  {CommonStrings.category}
                </Text>
                {editMode ? (
                  <Touchable onPress={openCategorySheet}>
                    <Row style={styles.categorySubContainer}>
                      <Text style={typography.body}>{values?.category}</Text>
                      <DownArrow />
                    </Row>
                  </Touchable>
                ) : (
                  <Row style={styles.categorySubContainer}>
                    <Text style={[typography.body, styles.input]}>
                      {values?.category}
                    </Text>
                    <DownArrow />
                  </Row>
                )}
              </Column>

              <CustomProfileInput
                label={CommonStrings.website}
                value={values.website}
                onChangeText={handleChange('website')}
                onBlur={handleBlur('website')}
                editable={editMode}
                isEdit={editMode}
                isError={errors.website}
                touched={Boolean(touched.website)}
              />
            </KeyboardAwareScrollView>
            {editMode && !isNew && (
              <Column style={{ marginBottom: vh(66) }}>
                <PrimaryButton
                  title={CommonStrings.deleteContractor}
                  onPress={() => {}}
                  containerStyle={{ backgroundColor: colors.red }}
                />
              </Column>
            )}
            <RNBottomSheet ref={bottomSheetRef}>
              <CategoryList
                onSelectCategory={(category_name, _id) =>
                  onSelectCategory(category_name, _id, setFieldValue)
                }
              />
            </RNBottomSheet>
            <RNBottomSheet ref={bottomSheetRef1}>
              <StateList onSelectState={onSelectState} />
            </RNBottomSheet>
            <RNBottomSheet ref={bottomSheetRef2}>
              <CityList sateData={selectedState} onSelectCity={onSelectCity} />
            </RNBottomSheet>
          </>
        )}
      </Formik>
    </Column>
  );
};

export default ContractorDetails;
