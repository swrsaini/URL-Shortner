import axiosInstance from '../utils/axiosInstance';

export const fetchUserAnalytics = async () => {
  const { data } = await axiosInstance.get('/api/user/analytics');
  return data;
};
