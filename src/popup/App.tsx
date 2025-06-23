import { Transition } from '@headlessui/react'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { type ChangeEventHandler, type MouseEventHandler, type PropsWithChildren, useState } from 'react'
import './App.css'
import { getStorage, setStorage } from '@/lib'

interface InputWithLabelParams {
  name: string
  label: string
  type: 'text'
  placeholder: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

type InfoBlockParams = PropsWithChildren<{
  link?: {
    href: string
    label: string
  }
  show: boolean
  dismiss: MouseEventHandler<HTMLButtonElement>
}>

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
        className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none"
        onChange={params.onChange}
      />
    </div>
  )
}

function InfoBlock(params: InfoBlockParams) {
  return (
    <Transition show={params.show} transition>
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
                onClick={params.dismiss}
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
  const [prompt, setPrompt] = useState<string>('')
  const [showHint, setShowHint] = useState<boolean>(false)

  const getInputRef = (id: string) => {
    const inputRef = document.querySelector<HTMLInputElement>(id)

    if (!inputRef) {
      throw new Error(`Input ref not found.`)
    }

    return inputRef
  }

  void getStorage({
    channelId: '',
    message: 'Hello Discord friends! Check out this image: <url>',
    prompt: '',
    showHint: false
  }).then((data) => {
    getInputRef('#channelId').value = data.channelId
    getInputRef('#message').value = data.message

    setPrompt(data.prompt)
    setShowHint(data.showHint)
  })

  function save() {
    if (prompt && prompt.length > 0) {
      setPrompt('')

      void setStorage({
        prompt: ''
      }).then(() => {
        console.log('Prompt nullified!')
      })
    }

    void setStorage({
      channelId: getInputRef('#channelId').value,
      message: getInputRef('#message').value
    }).then(() => {
      console.log('Input saved!')
    })
  }

  function dismissHint() {
    setShowHint(false)

    void setStorage({
      showHint: false
    }).then(() => {
      console.log('Storage set!')
    })
  }

  return (
    <>
      <div className="p-4 min-w-2xl space-y-2 text-lg">
        {prompt && <p>{prompt}</p>}
        <div className="-space-y-px">
          <InputWithLabel
            type="text"
            name="channelId"
            label="Channel ID"
            placeholder="1386692968026472512"
            onChange={save}
          />
          <InputWithLabel
            type="text"
            name="message"
            label="Message Template"
            placeholder="Hey Discord friends! Check out this image: <url>"
            onChange={save}
          />
        </div>
        <InfoBlock show={showHint} dismiss={dismissHint}>
          You can find the Discord channel ID by selecting the desired channel and copying the entire string after the final forward slash:
          <br />
          <br />
          <span className='opacity-50'>https://discord.com/channels/1386692967586336960/</span><em className='not-italic'>1386692968026472512</em>
          <br />
          <br />
          <code>{'<url>'}</code> is where the image URL will appear in the message.
        </InfoBlock>
      </div>
    </>
  )
}
