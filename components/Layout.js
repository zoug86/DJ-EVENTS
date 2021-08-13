import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'

export default function Layout({ content, title, keywords, description, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                // SEO
                <meta name={description} content={content} />
                <meta keywords={keywords} />
            </Head>
            <Header />
            <div className={styles.container}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'DJ Events | Find the hottest parties',
    description: 'Find the latest DJ and other musicla events',
    keywords: 'music, dj, edm, events',
}
