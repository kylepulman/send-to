'use client'

import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import {
  type MouseEventHandler,
  useState
} from 'react'

interface NotificationParams {
  status: string,
  dismiss: MouseEventHandler<HTMLButtonElement>
}

interface Message {
  status: 'idle' | 'pending' | 'success' | 'error'
}

function Notification(params: NotificationParams) {
  return (
    <div className='fixed top-0 w-full z-50'>
      <div className="flex w-full flex-col p-5 items-center space-y-4 sm:items-end">
        <Transition show={params.status !== 'idle'}>
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0">
            <div className="p-4">
              <div className="flex items-start">
                <div className="shrink-0">
                  {params.status === 'pending' && <ArrowPathIcon aria-hidden="true" className='size-6' />}
                  {params.status === 'success' && <CheckCircleIcon aria-hidden="true" className="size-6 text-green-400" />}
                  {params.status === 'error' && <ExclamationCircleIcon aria-hidden="true" className="size-6 text-red-400" />}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  {params.status === 'pending' && <p className="text-sm font-medium text-gray-900">Sending to your friends on Discord...</p>}
                  {params.status === 'success' && <p className="text-sm font-medium text-gray-900">Message sent!</p>}
                  {params.status === 'error' && <p className="text-sm font-medium text-gray-900">The message could not be sent, please check that the channel ID and access key is valid and that you have the Send To App installed on the channel's server.</p>}

                </div>
                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    onClick={params.dismiss}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

function App() {
  const [status, setStatus] = useState('idle')

  chrome.runtime.onMessage.addListener((message: Message) => {
    setStatus(message.status)

    setTimeout(() => { setStatus('idle') }, 10 * 1000)
  })

  return (
    <>
      {status !== 'idle' && <Notification status={status} dismiss={() => { setStatus('idle') }} />}
    </>
  )
}

export default App
