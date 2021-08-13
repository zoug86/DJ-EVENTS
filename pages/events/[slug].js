import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function EventPage({ evt }) {
    return (
        <Layout title='Event'>
            <h1>{evt.name}</h1>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${API_URL}/api/events`)
    const events = await res.json()
    const paths = events.map(evt => ({
        params: { slug: evt.slug }
    }))
    return {
        paths,
        fallback: true
    }
}
export async function getStaticProps({ params: { slug } }) {
    const res = await fetch(`${API_URL}/api/events/${slug}`)
    const evt = await res.json()
    return {
        props: { evt }
    }
}
// export async function getServerSideProps({ query: { slug } }) {
//     const res = await fetch(`${API_URL}/api/events/${slug}`)
//     const evt = await res.json()
//     return {
//         props: { evt }
//     }
// }