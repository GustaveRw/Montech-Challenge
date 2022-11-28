import { useState } from 'react'
import Web3 from 'web3';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
    const detectCurrentProvider = () => {
    let provider;
    if(window.ethereum) {
      provider = window.ethereum;
    } else if(window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Metamask is not found")
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts"});
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        setIsConnected(true);
      }
    } catch(err) {
      console.log(err);
    }
  }

  const onDisconnect = () => {
    setIsConnected(false);
  }
  return (
    <div>
      <Head>
        <title>Chess</title>
        <meta name="description" content="A next-typescript-tailwindcss chess game's landing page" />
        <link rel="icon" href="" />
      </Head>
      <div className='bg-body'>
        <div className='min-h-full flex items-center justify-center mt-32 py-12 px-4 sm:px-6 lg:px-8' >
            <div className='max-w-md w-full space-y-8'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Welcome to Chess Games
                    </h2>
                    <p className='mt-2 text-center text-sm text-gray-400'>
                        Sign in with your wallet to be able to authenticate and play games.
                    </p>
                  </div>

                <form className='mt-8 space-y-6'>
                  {!isConnected && (
                    <div>
                       <button onClick={onConnect} className='group relative w-full flex justify-center px-2 py-4 border border-transparent text-sm font-medium rounded-3xl  text-white bg-blue-400 hover:bg-blue-500
                       focus:outline-none focus:ring-2-offset focus:ring-blue-500'>
                          Sign In with Metamask
                       </button>
                    </div>
                  )}
                      <div>
                        <button className='group relative w-full flex justify-center px-2 py-4 border border-gray-400 text-sm font-medium rounded-3xl text-black bg-gray-100 hover:bg-gray-300
                        focus:outline-none focus:ring-2-offset focus:ring-blue-500'>
                            Sign In with Coinbase Wallet.
                        </button>

                        <div>
                         <a href='#' className='underline flex justify-center items-center font-medium mx-36 my-8  text-black hover:text-gray-500'>Show more options</a>
                       </div>
                     </div>
                </form>
                {isConnected && (
                  <div className='w-4 h-4 justify-center items-center bg-gray-700'>
                    <h2>You are connected to Metamask.</h2>
                  <div>
                    <span>Address: </span>
                    {ethBalance}
                  </div>
                  <div className='w-4 h-4 justify-center items-center bg-gray-600'>
                    <button onClick={onDisconnect}>
                      Sign Out
                    </button>
                  </div>
                  </div>
                )}
            </div>
          </div>
      </div>
    </div>
  )
}
