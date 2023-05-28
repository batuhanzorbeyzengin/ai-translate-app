import './globals.css'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import { GlobalNav } from '@/components/GlobalNav';
import { GlobalTopNav } from '@/components/GlobalTopNav';
import { ByLine } from '@/components/ByLine';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Design an AI Dubbing Editor',
  description: 'Design an AI Dubbing Editor App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="[color-scheme:dark]">
          <div className="overflow-y-scroll bg-gray-1100">
            <GlobalNav />
            <div className="bg-[#F2F2F2] h-[100vh] lg:pl-60 lg:pr-10">
              <GlobalTopNav />
              <div className="mx-auto max-w-full space-y-8 px-2 pt-20 lg:pb-8 lg:pt-[1.3rem] lg:px-5 lg:max-w-[1598px]">
                <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20 second-step">
                  <div className="rounded-lg bg-white p-3.5 lg:p-6">{children}</div>
                </div>
                <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20 third-step">
                  <div className="rounded-lg bg-white">
                    <ByLine />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </body>
    </html>
  )
}
