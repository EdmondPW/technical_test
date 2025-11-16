import { useAuthStore } from '@/state/auth.state'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [typeOfInput, setTypeOfInput] = useState(0)

  const router = useRouter()

  const handleChangeInputType = (input: number) => {
    setTypeOfInput(input)
  }
  const handleLogin = useAuthStore((s) => s.login)
  const handleRegister = useAuthStore((s) => s.register)

  const handleSubmit = async () => {
    let result = null
    if (typeOfInput == 0) {
      result = await handleLogin(name, password)
    } else {
      result = await handleRegister(name, password)
    }
    console.log(result)
    if (result.ok) {
      router.navigate({ to: '/check_attendance' })
    }
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-[#D3DAD9]">
      <div className="w-1/3 h-1/2 rounded-3xl shadow-2xl bg-white flex flex-col justify-center items-center">
        <div className="w-2/3 h-12">
          <div className="w-full h-full bg-gray-400 rounded-xl flex items-center justify-between text-center gap-1 px-1">
            <div
              className={`w-1/2 h-3/4 ${typeOfInput == 0 ? 'bg-white' : ''} rounded-xl`}
            >
              <button
                onClick={() => handleChangeInputType(0)}
                className="h-full w-full text-center"
              >
                Sign in
              </button>
            </div>
            <div
              className={`w-1/2 h-3/4 ${typeOfInput == 1 ? 'bg-white' : ''} rounded-xl`}
            >
              <button
                onClick={() => handleChangeInputType(1)}
                className="h-full w-full text-center"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/3 flex flex-col gap-2 pt-10">
          <div className="flex flex-col">
            <label htmlFor="user">name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-black focus:outline-none rounded pl-0.5 py-0.5 mt-2"
              type="text"
              name="user"
              id="user"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-black focus:outline-none rounded pl-0.5 py-0.5 mt-2"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-black text-white py-2 rounded mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
