import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function Home() {
  getServerSideProps()
  return (

    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`)


  return {
    props: {}, // will be passed to the page component as props
  }
}