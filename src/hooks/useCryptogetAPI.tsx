import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { LoadingContext, SetLoadingContext } from 'contexts/LoadingContextProvider'
import { Cryptos, GetBalanceQueryParams } from 'models/Cryptoget'
import { useContext } from 'react'
import { getCryptogetApiEndpoint } from 'utils/env'

export interface ResponseStructure {
  isLoaded: boolean
  data?: object | null
  hasError: boolean
  errorMessage: string
  status: number
  url?: string
}

export const useCryptogetApi = () => {
  const isLoading = useContext(LoadingContext)
  const setIsLoading = useContext(SetLoadingContext)

  const makeApiCall: <Type>(
    request: AxiosRequestConfig,
    timeout?: number
  ) => Promise<AxiosResponse<Type, any>> = async (request: AxiosRequestConfig, timeout = 20000) => {
    let response: AxiosResponse = undefined

    try {
      setIsLoading(true)
      const _useCryptogetApi: AxiosResponse = await axios(request)
      response = _useCryptogetApi
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
      return response
    }
  }

  const getBalanceFor = async (cryptoHoldings: GetBalanceQueryParams) => {
    const baseUrl = getCryptogetApiEndpoint()

    const response = await makeApiCall({
      url: `${baseUrl}/crypto/balance-totals`,
      params: cryptoHoldings,
      method: 'get',
    })

    console.log(response.data)

    return response.data
  }

  const getCryptoList = async () => {
    const baseUrl = getCryptogetApiEndpoint()

    const response = await makeApiCall<Cryptos>({
      url: `${baseUrl}/crypto/get-crypto-list`,
      method: 'get',
    })

    return response.data
  }

  return { getBalanceFor, getCryptoList, isLoading }
}
