import axiosInstance from '../utils/axiosInstance';

export const fetchShortUrlAnalytics = async (shortUrl) => {
  const { data } = await axiosInstance.get(`/api/user/analytics/${shortUrl}`);
  return data;
};
