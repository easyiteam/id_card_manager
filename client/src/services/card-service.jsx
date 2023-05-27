import HttpService from "./htttp.service";

class CardService {
  // cardEndpoint = process.env.API_URL;

  create = async (payload) => {
    const createEndpoint = 'card/create';
    return await HttpService.post(createEndpoint, payload);
  };

  read = async () => {
    const getCard = 'card/read';
    return await HttpService.get(getCard);
  };

  update = async (newCardInfo) => {
    const updateEndpoint = 'card/update';
    return await HttpService.patch(updateEndpoint, newCardInfo);
  };

  delete = async (payload) => {
    const deleteEndpoint = 'card/delete';
    return await HttpService.delete(deleteEndpoint, payload);
  };
}

export default new CardService();
