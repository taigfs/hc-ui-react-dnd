import axiosInstance from "./api";

export abstract class BrowserTesterService {

  static async openBrowser (url: string, instanceId: string) {
    const response = await axiosInstance.post(`/open`, { url, instanceId });
    return response.data;
  };

  static async typeText (selector: string, text: string, instanceId: string) {
    const response = await axiosInstance.post(`/type`, { selector, text, instanceId });
    return response.data;
  };

  static async clickElement (selector: string, instanceId: string) {
    const response = await axiosInstance.post(`/click`, { selector, instanceId });
    return response.data;
  };

  static async closeBrowser (instanceId: string) {
    const response = await axiosInstance.post(`/close`, { instanceId });
    return response.data;
  };
}
