import { storage, type ButtonParams, type InfoBlockParams, type Input, type InputParams } from '@/config'
import { Transition } from '@headlessui/react'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

function Input(params: InputParams) {
  return (
    <div className="first-of-type:rounded-t-md last-of-type:rounded-b-md bg-white px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
      <label htmlFor="job-title" className="block font-medium text-gray-900">
        {params.label}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <input
          id={params.name}
          name={params.name}
          type={params.type}
          placeholder={params.placeholder}
          className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 text-base text-gray-900 placeholder:text-gray-300 focus:outline-0"
          onInput={params.onInput}
        />
      </div>
    </div>
  )
}

function Button(params: ButtonParams) {
  return (
    <button
      type="button"
      onClick={params.onClick}
      disabled={!params.canSave}
      className="mt-2 cursor-pointer disabled:cursor-default disabled:bg-indigo-200 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Save
    </button>
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
  const [input, setInput] = useState<Input>({
    channelId: '',
    message: ''
  })

  function validate() {
    if (input.channelId.length === 0 || input.message.length === 0 || !input.message.includes('<url>')) {
      return false
    } else {
      return true
    }
  }

  function typing({ currentTarget }: { currentTarget: HTMLInputElement }) {
    setInput({ ...input, [currentTarget.name]: currentTarget.value })
  }

  function save() {
    const data = storage.defaults

    if (prompt && prompt.length > 0) {
      setPrompt('')

      data.prompt = ''
    }

    data.channelId = input.channelId
    data.message = input.message
    
    void storage.set({
      channelId: data.channelId,
      message: data.message,
      prompt: data.prompt
    })
  }

  function dismissHint() {
    setShowHint(false)

    void storage.set({
      showHint: false
    })
  }

  useEffect(() => {
    const channelIdRef = document.querySelector<HTMLInputElement>('#channelId')
    const messageRef = document.querySelector<HTMLInputElement>('#message')

    if (!channelIdRef || !messageRef) {
      throw new Error('A reference to an element could not be found.')
    }

    void storage.get().then((data) => {
      console.log(data)

      channelIdRef.value = data.channelId
      messageRef.value = data.message

      setInput({
        channelId: data.channelId,
        message: data.message
      })

      setPrompt(data.prompt)
      setShowHint(data.showHint)
    })
  }, [])

  return (
    <>
      <div className="p-4 min-w-2xl space-y-2 text-lg">
        {prompt && <p>{prompt}</p>}
        <div className="-space-y-px">
          <Input
            type="text"
            name="channelId"
            label="Channel ID"
            placeholder="1386692968026472512"
            onInput={typing}
          />
          <Input
            type="text"
            name="message"
            label="Message Template"
            placeholder="Hey Discord friends! Check out this image: <url>"
            onInput={typing}
          />
          <Button onClick={save} canSave={validate()} />
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
