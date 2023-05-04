import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import LoginModal from '@/components/models/LoginModal';
import RegisterModal from '@/components/models/RegisterModal';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      {/* <Modal isOpen actionLabel='Submit' title='Test Modal'/> */}
      <LoginModal />
      <RegisterModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
