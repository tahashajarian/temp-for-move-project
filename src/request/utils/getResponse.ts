export const getResponseData = (response: any) => {
  return response?.data?.result;
};

export const getResponseSuccess = (response: any) => {
  return response.data ? String(response.data?.result) : "عملیات با موفقیت انجام شد";
};

export const getResponseError = (error: any) => {
  return (
    error.response?.data.detail ||
    error.response?.data.error ||
    error.response?.data.message ||
    "خطا در برقراری ارتباط با سرور"
  );
};

export const getErrorStatus = (error: any) => {
  return error.response ? error.response.status : "خطای نامشخص";
};

export const getErrorMessage = (response: any) => {
  return response?.data?.message || 'خطای نامشخص';
};

export const getStatusCode = (response: any) => {
  return response?.data?.statusCode;
};
