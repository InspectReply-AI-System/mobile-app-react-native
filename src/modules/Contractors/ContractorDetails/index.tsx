import React, { useEffect, useRef, useState } from 'react';
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
import { registerContractor } from '@inspectreplyai/network/contractorAPis';
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

const ContractorDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Roofing');
  const [selectedState, setSelectedState] = useState('Select State');
  const [selectedCity, setSelectedCity] = useState('Select City');

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
  const { isNew } = route.params ?? { isNew: false };

  useEffect(() => {
    if (isNew) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [isNew]);

  const { user } = useAppSelector((store) => store.AuthSlice);

  const openCategorySheet = () => {
    if (editMode && bottomSheetRef.current) {
      bottomSheetRef.current.openSheet();
    }
  };

  const onSelectCategory = (category: string) => {
    setSelectedCategory(category);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.closeSheet();
    }
  };

  const openStateSheet = () => {
    if (editMode && bottomSheetRef1.current) {
      bottomSheetRef1.current.openSheet();
    }
  };
  const onSelectState = (state: string) => {
    setSelectedState(state);
    if (bottomSheetRef1.current) {
      bottomSheetRef1.current.closeSheet();
    }
  };

  const openCitySheet = () => {
    if (editMode && bottomSheetRef2.current) {
      bottomSheetRef2.current.openSheet();
    }
  };
  const onSelectCity = (city: string) => {
    setSelectedCity(city);
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
    const profileData = {
      customer: user?.userId,
      contractor_name: 'Abhi12',
      company_name: formData.company,
      email: formData.email,
      phone: formData.phone,
      address_1: formData.address1,
      address_2: formData.address2,
      city: '66d82544378c1d0a62f3bdef',
      state: '66d8254a46017b7430a11c6c',
      zip_code: formData.zip,
      category: '66d825416a8d9d15ca5efe56',
      website: formData.website,
    };
    try {
      const result = await registerContractor(profileData);
      showSuccessToast(result?.data?.message);
      goBack();
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
        initialValues={{
          company: isNew ? '' : 'Five Star Plumbing',
          email: isNew ? '' : 'fivestarplumbing@gmail.com',
          phone: isNew ? '' : '4246869831',
          address1: isNew ? '' : '7112 Balboa Blvd. Van Nuys, CA 91406',
          address2: isNew ? '' : '7112 Balboa Blvd. Van Nuys, CA 91406',
          city: 'New York',
          state: 'New York',
          zip: isNew ? '' : '10001',
          category: 'Roofing',
          website: isNew ? '' : 'fivestarplumbing.com',
        }}
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
        }) => (
          <>
            <CustomHeader
              title='Chuck Smith'
              leftIcon={<BackIcon />}
              rightIcon={!editMode ? <Edit /> : <Save />}
              onRightPress={() => onPressEdit(validateForm, handleSubmit)}
              disabled={false}
            />

            <ScrollView
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
                      <Text style={typography.body}>{selectedCity}</Text>
                    </Row>
                  </Touchable>
                ) : (
                  <Row style={styles.categorySubContainer}>
                    <Text style={[typography.body, styles.input]}>
                      {selectedCity}
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
                      <Text style={typography.body}>{selectedState}</Text>
                    </Row>
                  </Touchable>
                ) : (
                  <Row style={styles.categorySubContainer}>
                    <Text style={[typography.body, styles.input]}>
                      {selectedState}
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
                      <Text style={typography.body}>{selectedCategory}</Text>
                      <DownArrow />
                    </Row>
                  </Touchable>
                ) : (
                  <Row style={styles.categorySubContainer}>
                    <Text style={[typography.body, styles.input]}>
                      {selectedCategory}
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
            </ScrollView>
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
                categories={['Roofing', 'Plumbing', 'Electrical', 'Carpentry']}
                onSelectCategory={onSelectCategory}
              />
            </RNBottomSheet>
            <RNBottomSheet ref={bottomSheetRef1}>
              <StateList
                states={['New York', 'New Jersey', 'USA', 'America']}
                onSelectState={onSelectState}
              />
            </RNBottomSheet>
            <RNBottomSheet ref={bottomSheetRef2}>
              <CityList
                cities={['New York', 'New Jersey', 'USA', 'America']}
                onSelectCity={onSelectCity}
              />
            </RNBottomSheet>
          </>
        )}
      </Formik>
    </Column>
  );
};

export default ContractorDetails;
