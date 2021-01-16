import React from 'react'
import { fetchAPIwithSSR } from '../lib/api'
import HeroSection from '../components/Section/HeroSection'
import ContentSection from '../components/Section/Content'
import CounterSection from '../components/Section/counter-section'
import CTASection from '../components/Section/Cta'
import ServiceSection from '../components/Section/Services'
import TeamSection from '../components/Section/team-section'
import HeadingSection from '../components/Section/Heading'
import PricingSection from '../components/Section/Pricing'
import ContactSection from '../components/Section/Contact'
import FAQSection from '../components/Section/Faq'
import LoginSection from '../components/Section/Login'
import { GetServerSideProps } from 'next'

export default function SubPage(pageProps) {

  const { page } = pageProps;
  return (
    <React.Fragment>
      {page.content.map((section, i) => {
        if (section.type == 'page_heading_section_block') return <HeadingSection key={i} title={page.title} data={section.value} />
        if (section.type == 'hero_section_block') return <HeroSection key={i} data={section.value} />
        if (section.type == 'content_section_block') return <ContentSection key={i} data={section.value} />
        if (section.type == 'counter_section_block') return <CounterSection key={i} data={section.value} />
        if (section.type == 'cta_section_block') return <CTASection key={i} data={section.value} />
        if (section.type == 'service_section_block') return <ServiceSection key={i} data={section.value} />
        if (section.type == 'team_section_block') return <TeamSection key={i} data={section.value} />
        if (section.type == 'pricing_section_block') return <PricingSection key={i} data={section.value} />
        if (section.type == 'contact_section_block') return <ContactSection key={i} title={page.title} data={section.value} />
        if (section.type == 'faq_section_block') return <FAQSection key={i} data={section.value} />
        if (section.type == 'login_section_block') return <LoginSection key={i} data={section.value} />
      })}
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
  const page = (await fetchAPIwithSSR(`/api/v2/pages/find/?html_path=${params.slug}`, { method: 'GET', req: req })) ?? []
  // const user = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { method: 'GET', req: req })) ?? null
  return {
    props: {
      page: page,
      themeSettings: settings.theme_settings,
      mainMenus: settings.main_menus,
      flatMenus: settings.flat_menus,
      // user,
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: page.title,
    },
  }
}