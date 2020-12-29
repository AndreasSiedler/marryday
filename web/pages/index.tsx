import Head from 'next/head'
import { fetchAPIwithSSR } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import HeroSection from '../components/HeroSection'
import ContentSection from '../components/sections/Content'
import CounterSection from '../components/counter-section'
import CTASection from '../components/sections/Cta'
import ServiceSection from '../components/sections/Services'
import TeamSection from '../components/team-section'
import HeadingSection from '../components/heading-section'
import ComingSoonSection from '../components/coming-soon-section'
import FAQSection from '../components/sections/Faq'
import { GetServerSideProps } from 'next'

export default function Index(pageProps) {

  const { page } = pageProps;
  return (
    <>
      <Head>
        <title>{page.title} {CMS_NAME}</title>
        {/* <!-- Seo Meta --> */}
        <meta name="description" content="Listigo | Directory Bootstrap 4 Template" />
        <meta name="keywords" content="listing dashboard, directory panel, listing, responsive directory, directory template, themeforest, listing template, css3, html5" />
      </Head>
      {page.content.map((section, i) => {
        if (section.type == 'page_heading_section_block') return <HeadingSection key={i} data={section.value} />
        if (section.type == 'hero_section_block') return <HeroSection key={i} data={section.value} />
        if (section.type == 'content_section_block') return <ContentSection key={i} data={section.value} />
        if (section.type == 'counter_section_block') return <CounterSection key={i} data={section.value} />
        if (section.type == 'cta_section_block') return <CTASection key={i} data={section.value} />
        if (section.type == 'service_section_block') return <ServiceSection key={i} data={section.value} />
        if (section.type == 'team_section_block') return <TeamSection key={i} data={section.value} />
        if (section.type == 'comingsoon_section_block') return <ComingSoonSection key={i} data={section.value} />
        if (section.type == 'faq_section_block') return <FAQSection key={i} data={section.value} />
      })}
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
  const page = (await fetchAPIwithSSR('/api/v2/pages/?type=home.HomePage&fields=seo_text,content', { method: 'GET', req: req })) ?? []
  // const user = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { method: 'GET', req: req })) ?? null
  return {
    props: {
      page: page.items[0],
      themeSettings: settings.theme_settings,
      mainMenus: settings.main_menus,
      flatMenus: settings.flat_menus,
      // user,
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Rooms | Category - Map on the top",
    },
  }
}
