import { CircularProgress, Grid } from '@material-ui/core'
import GetBalanceForm from 'components/GetBalanceForm'
import { useCryptogetApi } from 'hooks/useCryptogetAPI'
import { CryptoBalance, Cryptos } from 'models/Cryptoget'
import React, { useEffect, useState } from 'react'
import { isEmpty } from 'utils/baseUtils'
import './dashboard.css'

export const Dashboard: React.FC = _ => {
  const { getBalanceFor } = useCryptogetApi()
  const { getCryptoList, isLoading } = useCryptogetApi()
  const [cryptos, setCryptos] = useState<Cryptos>([])
  const [balances, setBalances] = useState<CryptoBalance>({})

  const fetchCryptoList = async () => {
    const cryptoList = await getCryptoList()

    setCryptos(cryptoList)
  }

  const fetchGetBalances = async (cryptoSymbol: string, holdings: number) => {
    const response = await getBalanceFor({
      [cryptoSymbol]: holdings,
    })

    setBalances(response)
  }

  useEffect(() => {
    fetchCryptoList()
  }, [])

  return (
    <Grid container justifyContent="space-between" className="dashboard">
      {isLoading ? (
        <CircularProgress />
      ) : !isEmpty(balances) ? (
        balances?.total
      ) : (
        <GetBalanceForm cryptos={cryptos} fetchGetBalances={fetchGetBalances} />
      )}
    </Grid>
  )
}
