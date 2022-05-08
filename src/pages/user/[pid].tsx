import { useRouter } from "next/router"
import { useState } from "react"
import { getUserById } from "../../api/services"

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
  const pid = context.query.pid
  const token = context.req.cookies["token"]
  let info = null
  await getUserById(pid, { headers: { token } }).then((res) => {
    info = res
  })
  return {
    props: {
      name: 123,
      info,
    },
  }
}
