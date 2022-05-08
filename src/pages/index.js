import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home({ allData }) {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>1Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div onClick={async () => {
        const res = await fetch('/api/user', { headers: { 'Content-Type': 'application/json;charset=UTF-8' }, method: 'get' })
        res.json().then((res) => {
          console.log(res);
        })
      }}>123</div>
      {
        allData?.map((item) => {
          return <div key={item.id} onClick={() => {
            router.push({
              pathname: '/user/[pid]',
              query: { pid: item.id },
            })
          }}>{item.name || 'xxxxxxxxxxxx'}:{item.address || "22222222222222"}
            <Link href={`/user/${item.id}`} as={`/user/${item.id}`}>
              <a>Blog Post</a>
            </Link>
          </div>
        })
      }
    </div>
  )
}

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;
  const token = context.req.cookies['token']
  if (!token) {
    console.log("🚀 ~ file: index.js ~ line 48 ~ getServerSideProps ~ 没有登录", '没有登录')
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {
      name: 123,
      allData: []
    }
  }
}