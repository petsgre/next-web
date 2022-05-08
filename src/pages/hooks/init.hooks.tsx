import { Button, message, notification } from "antd"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export function useInit(user) {
  const router = useRouter()
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    setFlag(user.signed)
    if (typeof window !== "undefined") {
      if (!user.signed) {
        console.log("**********")
        const key = `open${Date.now()}`
        const btn = (
          <Button
            type="primary"
            size="small"
            onClick={() => {
              notification.close(key)
              router.push("/login")
            }}
          >
            Confirm
          </Button>
        )
        notification.open({
          message: "提示",
          description: "登录态失效!",
          btn,
          key,
          placement: "top",
        })
      }
    }
  }, [])
  return {
    flag,
  }
}

export default function Index() {
  return <div>123</div>
}
