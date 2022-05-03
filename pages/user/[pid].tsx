import { useRouter } from "next/router"
import { useState } from "react"

export default function User(props) {
  const { info } = props
  console.log(info)
  const [first, setFirst] = useState(1)
  return (
    <div>
      {Object.entries(info).map(([k, v]) => {
        console.log(k, v)
        return <div key={k}>{`${k}:${v}`}</div>
      })}
    </div>
  )
}
export async function getServerSideProps(context) {
  const token = context.req.cookies["token"]
  console.log(
    "🚀 ~ file: [pid].js ~ line 13 ~ getServerSideProps ~ context.req",
    context.query
  )
  const pid = context.query.pid
  let res = null
  let info = {}
  try {
    res = await fetch("http://localhost:8020/user/" + pid, {
      method: "get",
      headers: { token: token },
    })
    console.log(res)
    if (res.status === 200) {
      info = await res.json()
    }
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      name: 123,
      info,
    },
  }
}
