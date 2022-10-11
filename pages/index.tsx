import type { NextPage } from "next"
import { SyntheticEvent, useState } from "react"
import { HiPlus } from "react-icons/hi"
import { request } from "../services/request"

const Home: NextPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [response, setResponse] = useState("")

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const data = await request("POST", {
      baseUrl: "https://us-central1-open-roszti.cloudfunctions.net/app",
      path: `/users/add?${new URLSearchParams({ name, mail: email })}`,
    })

    setResponse(data?.message)
  }

  return (
    <div className="flex h-screen w-screen select-none items-center justify-center text-gray-500">
      <form
        onSubmit={(e) => onFormSubmit(e)}
        action=""
        className="flex flex-col space-y-3"
      >
        <p className="text-lg font-bold">Új tag rögzítése</p>
        <input
          placeholder="Teljes Név"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          type="text"
          className="rounded-md bg-slate-100 py-1 px-3 text-sm outline-none"
        />
        <input
          placeholder="ESTIEM e-mail cím"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          className="rounded-md bg-slate-100 py-1 px-3 text-sm outline-none"
        />
        <button className="hover flex items-center justify-center rounded-md bg-emerald-500 py-1 px-3 text-sm text-white outline-none hover:bg-emerald-600">
          <HiPlus className="mr-1" />
          Hozzáadás
        </button>
        <p className="text-xs text-emerald-500">{response}</p>
      </form>
    </div>
  )
}

export default Home
