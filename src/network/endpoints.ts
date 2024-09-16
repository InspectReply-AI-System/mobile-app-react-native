export const endpoints = {
  auth: {
    login: '/api/customer/login',
    register: '/api/customer/register',
    setNewPassword: '/api/customer/set-password',
    forgotPassword: '/api/customer/forgot-password',
    verifyOtp: '/api/customer/validate-otp',
    getUserProfile: '/api/customer/',
    updateUserProfile: '/api/customer/update-profile/',
    updateProfilePhoto: 'api/customer/profile-photo',
  },
  contractors: {
    register: '/api/contractor/register',
  },
};
