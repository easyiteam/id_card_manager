import HttpService from "./htttp.service";

class SettingService {
  // cardEndpoint = process.env.API_URL;

  create = async (payload) => {
    const createEndpoint = 'create';
    return await HttpService.post(createEndpoint, payload);
  };

  read = async () => {
    const getSetting = 'read';
    return await HttpService.get(getSetting);
  };

  update = async (newCardInfo) => {
    const updateEndpoint = 'update';
    return await HttpService.patch(updateEndpoint, newCardInfo);
  };

  delete = async (payload) => {
    const deleteEndpoint = 'delete';
    return await HttpService.delete(deleteEndpoint, payload);
  };
}

export default new SettingService();
