import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GetBalanceQueryParams } from "models/Cryptoget";

export const useCryptogetApi = () => {
  const makeApiCall = async (request: AxiosRequestConfig, timeout = 20000) => {
    let response: AxiosResponse = undefined;

    const _useCryptogetApi: AxiosResponse = await axios(request);

    try {
      response = _useCryptogetApi;
    } catch (e) {
      console.error(e);
    } finally {
      return response;
    }
  };

  const getBalanceFor = async (cryptoHoldings: GetBalanceQueryParams) =>
    await makeApiCall({
      url: `https://cryptoget.dev/api/crypto/balance-totals`,
      params: cryptoHoldings,
      method: "get",
    });

  return { getBalanceFor };
};
