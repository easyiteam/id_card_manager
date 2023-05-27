import HttpService from "./htttp.service";

class SettingService {
  // cardEndpoint = process.env.API_URL;

  create = async (payload) => {
    const createEndpoint = 'setting/create';
    return await HttpService.post(createEndpoint, payload);
  };

  read = async () => {
    const getSetting = 'setting/read';
    return await HttpService.get(getSetting);
  };
  
  getAll = async () => {
    const getAllSettings = 'setting/getAll';
    return await HttpService.get(getAllSettings);
  };

  update = async (newCardInfo) => {
    const updateEndpoint = 'setting/update';
    return await HttpService.patch(updateEndpoint, newCardInfo);
  };

  delete = async (payload) => {
    const deleteEndpoint = 'setting/delete';
    return await HttpService.delete(deleteEndpoint, payload);
  };
}

export default new SettingService();
