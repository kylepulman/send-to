import { Transition } from '@headlessui/react'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { type MouseEventHandler, type PropsWithChildren, type Ref, useRef, useState } from 'react'
import './App.css'

interface InputWithLabelParams {
  name: string
  label: string
  type: 'text'
  placeholder: string
  ref: Ref<HTMLInputElement>
}

interface ButtonParams {
  type: "button" | "submit"
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

type InfoBlockParams = PropsWithChildren<{
  link?: {
    href: string
    label: string
  }
}>

function Button(params: ButtonParams) {
  return (
    <button
      type={params.type}
      className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      onClick={params.onClick}
    >
      {params.label}
    </button>
  )
}

function InputWithLabel(params: InputWithLabelParams) {
  return (
    <div className="first-of-type:rounded-t-md last-of-type:rounded-b-md bg-white px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
      <label htmlFor="job-title" className="block font-medium text-gray-900">
        {params.label}
      </label>
      <input
        id={params.name}
        name={params.name}
        type={params.type}
        placeholder={params.placeholder}
        ref={params.ref}
        className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />
    </div>
  )
}


function InfoBlock(params: InfoBlockParams) {
  const [isShow, setIsShow] = useState(true)

  return (
    <Transition show={isShow} transition>
      <div className="rounded-md bg-blue-50 p-4 transition duration-150 ease-in data-closed:opacity-0">
        <div className="flex">
          <div className="shrink-0">
            <InformationCircleIcon aria-hidden="true" className="size-5 text-blue-400" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">{params.children}</p>
            {
              params.link &&
              <p className="mt-3 text-sm md:mt-0 md:ml-6">
                <a href={params.link.href} className="font-medium whitespace-nowrap text-blue-700 hover:text-blue-600">
                  {params.link.label}
                </a>
              </p>
            }
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className="inline-flex rounded-md bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-100 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50 focus:outline-hidden"
                onClick={() => { setIsShow(false) }}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default function App() {
  const channelIdRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div className="p-4 min-w-2xl space-y-2 text-lg">
        <div className="-space-y-px">
          <InputWithLabel
            type="text"
            name="channelId"
            label="Channel ID"
            placeholder="1386692968026472512"
            ref={channelIdRef}
          />
          <InputWithLabel
            type="text"
            name="message"
            label="Message Template"
            placeholder="Hey Discord friends! Check out this image: <url>"
            ref={messageRef}
          />
        </div>
        <Button
          type="button"
          onClick={() => { console.log('Saved!') }}
          label="Save"
        />
        <InfoBlock>
          You can find the Discord channel ID by selecting the desired channel and copying the entire string after the final forward slash:
          <br />
          <br />
          <span className='opacity-50'>https://discord.com/channels/1386692967586336960/</span><em className='not-italic'>1386692968026472512</em>
        </InfoBlock>
        <InfoBlock>
          <code>{'<url>'}</code> is where the image URL will appear in the message.
        </InfoBlock>
      </div>
    </>
  )
}
