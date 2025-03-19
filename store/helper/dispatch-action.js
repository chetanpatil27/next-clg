import { axiosInstance } from "@/config/https";
import { toast } from "react-toastify";

const dispatchAction = async ({
  dispatch,
  payload = {},
  headers = {},
  endpoint = "",
  method = "GET",
  params = {},
  setLoading,
  dispatchSetLoading = true,
  setData,
  onSuccess = null,
  onError,
  showError = true,
  errorMsg = "Something went wrong",
  showSuccess = true,
  successMsg = "Success",
  isFormData = false,
  onUploadProgress,
  onDownloadProgress,
  signal,
}) => {
  const startLoading = (val) => {
    if (setLoading && typeof setLoading === "function") {
      if (dispatchSetLoading) {
        dispatch(setLoading(val));
      } else {
        setLoading(val);
      }
    }
  };
  startLoading(true);
  try {
    const res = await axiosInstance({
      method: method,
      url: endpoint,
      data: payload,
      params: params,
      headers: {
        ...headers,
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
      onUploadProgress: onUploadProgress,
      onDownloadProgress: onDownloadProgress,
      signal: signal,
    });
    let finalData = res?.data?.data ? res.data.data : res.data;
    if (onSuccess || typeof onSuccess === "function") {
      finalData = await onSuccess(res);
    }
    if (finalData && setData) {
      dispatch(setData(finalData));
    } else {
      setData && dispatch(setData(null));
    }
    if (showSuccess) {
      toast.success(successMsg);
    }
    return { data: finalData, status: res.status };
  } catch (error) {
    console.log("error", error);
    let finalErr = error?.response?.data;
    if (onError || typeof onError === "function") {
      finalErr = await onError(error);
    }
    if (showError && !onError) {
      setData && dispatch(setData(null));
      toast.error(errorMsg);
    }
    return finalErr;
  } finally {
    startLoading(false);
  }
};

export default dispatchAction;
