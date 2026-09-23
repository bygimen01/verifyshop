import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, BadgeCheck, BarChart3, Check, ChevronDown, DollarSign, FileText, Globe2, Instagram, LockKeyhole, Mail, Menu, Moon, Plus, RefreshCw, Send, ShieldCheck, Sparkles, Sun, Users, X } from 'lucide-react'

const Text = (Value, Language) => Value?.[Language] ?? Value?.en ?? ''
const Interpolate = (Value, Variables = {}) => Object.entries(Variables).reduce(
  (Result, [Key, Replacement]) => Result.replaceAll(`{${Key}}`, Replacement ?? ''),
  Value ?? ''
)

const SetMetaContent = (Selector, Content) => {
  if (!Content) return
  const Element = document.querySelector(Selector)
  if (Element) Element.setAttribute('content', Content)
}

const SetLinkHref = (Selector, Href) => {
  if (!Href) return
  const Element = document.querySelector(Selector)
  if (Element) Element.setAttribute('href', Href)
}

const CreateBrandFavicon = Brand => {
  const Background = Brand?.icon?.background || '#6f63f6'
  const Foreground = Brand?.icon?.foreground || '#ffffff'
  const Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="${Background}"/><path d="M32 13.5l5.1 3.1 5.9.6 2.2 5.5 4.4 4-1.4 5.8 1.4 5.8-4.4 4-2.2 5.5-5.9.6-5.1 3.1-5.1-3.1-5.9-.6-2.2-5.5-4.4-4 1.4-5.8-1.4-5.8 4.4-4 2.2-5.5 5.9-.6L32 13.5z" fill="none" stroke="${Foreground}" stroke-width="3.2" stroke-linejoin="round"/><path d="M25.8 32.2l4 4 8.6-9" fill="none" stroke="${Foreground}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(Svg)}`
}

const BrandMark = ({ Brand, size = 20, small = false }) => (
  <span
    className={`brandMark${small ? ' small' : ''}`}
    style={{
      background: Brand?.icon?.background || '#6f63f6',
      color: Brand?.icon?.foreground || '#ffffff'
    }}
  >
    <BadgeCheck size={size} />
  </span>
)

const Translations = {
  en: {
    navServices: 'Services',
    navAbout: 'Why us',
    navProcess: 'Process',
    navFaq: 'FAQ',
    navContact: 'Contact',
    heroKicker: 'Verification · Recovery · Reputation',
    heroTitleA: 'A verified presence',
    heroTitleB: 'people can trust.',
    heroText: 'Verification assistance for Instagram, Facebook and X, account recovery and digital reputation protection. We review each case before work begins and explain the route, timing and terms in advance.',
    heroPrimary: 'View services',
    heroSecondary: 'Get a case review',
    noPayment: 'No card data collected',
    humanSupport: 'Direct team support',
    existingNew: 'Existing & new accounts',
    servicesKicker: 'Services & pricing',
    servicesTitle: 'Choose the right format for your case.',
    servicesText: 'Select one or several services. The final route depends on the account type, current status and platform eligibility.',
    all: 'All',
    instagram: 'Instagram',
    facebook: 'Facebook',
    x: 'X / Twitter',
    recovery: 'Recovery',
    reputation: 'Reputation',
    security: 'Security',
    consulting: 'Guides',
    featured: 'Popular',
    select: 'Add service',
    selected: 'Added',
    serviceRequest: 'Get verified',
    duration: 'Timing',
    requestCount: 'selected',
    openRequest: 'Continue request',
    aboutKicker: 'Why clients choose us',
    aboutTitle: 'A clear process before any commitment.',
    aboutText: 'We do not force every account into the same scenario. First we assess the profile and task, then explain what can realistically be done.',
    about1Title: 'Individual assessment',
    about1Text: 'Account status, verification eligibility, previous appeals and risks are reviewed before the work format is confirmed.',
    about2Title: 'Transparent terms',
    about2Text: 'You receive the expected route, timing and commercial terms before the case moves forward.',
    about3Title: 'Support through completion',
    about3Text: 'The team stays in touch during the process and explains the next steps after the result is received.',
    about1Note: 'Clear plan and honest assessment',
    about2Note: 'You always know what you pay for',
    about3Note: 'Support through the final result',
    statsTitleA: 'Real results and experience',
    statsTitleB: 'clients trust.',
    processNote1: '1–2 minutes',
    processNote2: 'Usually 1–24 hours',
    processNote3: 'Transparent, no hidden payments',
    processNote4: 'Proven by experience',
    statsKicker: 'Experience',
    statsTitle: 'Real results and experience clients trust.',
    processKicker: 'How it works',
    processTitle: 'From request to result in just 4 simple steps.',
    processText: 'No complicated actions. You send a request and we handle the rest, with clear terms, safety and support at every stage.',
    step1Title: 'Send the case',
    step1Text: 'Choose services, add account links and describe the task.',
    step2Title: 'Initial review',
    step2Text: 'We evaluate account status, available route, expected timing and risks.',
    step3Title: 'Confirm terms',
    step3Text: 'The team contacts you directly and agrees the final format before work begins.',
    step4Title: 'Execution & support',
    step4Text: 'We keep you updated during the process and provide next-step guidance after completion.',
    faqKicker: 'FAQ',
    faqTitle: 'Important questions before you start.',
    faqText: 'Answers about verification formats, subscriptions, account recovery, safety and the request process.',
    contactKicker: 'Case review',
    contactTitle: 'Not sure which service fits your situation?',
    contactText: 'Send a structured request with your account link and a short description. The team will review the case and contact you directly.',
    requestTitle: 'Request a case review',
    requestText: 'Select services, add account links and tell us how urgent the task is.',
    name: 'Name',
    namePlaceholder: 'How should we address you?',
    contact: 'Contact',
    contactPlaceholder: '@telegram, email or phone',
    clientType: 'Client type',
    individual: 'Individual',
    business: 'Business',
    agency: 'Agency / partner',
    urgency: 'Urgency',
    normal: 'Standard',
    urgent: 'Urgent',
    flexible: 'No rush',
    accountLinks: 'Account links',
    accountPlaceholder: 'https://instagram.com/...',
    addAccount: 'Add another account',
    details: 'Case details',
    detailsPlaceholder: 'Describe the current account status, the result you need and anything already attempted.',
    servicesField: 'Services',
    submit: 'Send request',
    submitting: 'Sending...',
    successTitle: 'Request received',
    successText: 'The request has been delivered to the team in Telegram. We can now review the details and contact you using the information provided.',
    errorTitle: 'Could not send request',
    close: 'Close',
    emptyServices: 'Select at least one service',
    privacy: 'No payment or card data is collected on this website.',
    menu: 'Menu',
    languageLabel: 'Language',
    currencyLabel: 'Currency',
    themeLabel: 'Appearance',
    ruble: 'RUB · ₽',
    dollar: 'USD · $',
    lightTheme: 'Light',
    darkTheme: 'Dark',
    serviceDetails: 'Details',
    serviceDetailsClose: 'Hide details'
  },
  ru: {
    navServices: 'Услуги',
    navAbout: 'Почему мы',
    navProcess: 'Как работаем',
    navFaq: 'FAQ',
    navContact: 'Контакты',
    heroKicker: 'Верификация · Восстановление · Репутация',
    heroTitleA: 'Подтверждённый статус,',
    heroTitleB: 'которому доверяют.',
    heroText: 'Помощь с верификацией Instagram, Facebook и X, восстановлением аккаунтов и защитой цифровой репутации. Каждый кейс сначала проверяем, а затем заранее объясняем возможный сценарий, сроки и условия.',
    heroPrimary: 'Смотреть услуги',
    heroSecondary: 'Получить оценку',
    noPayment: 'Без сбора данных карты',
    humanSupport: 'Прямая связь с командой',
    existingNew: 'Новые и действующие аккаунты',
    servicesKicker: 'Услуги и цены',
    servicesTitle: 'Подберите формат под свою задачу.',
    servicesText: 'Можно выбрать одну или несколько услуг. Итоговый сценарий зависит от типа аккаунта, его текущего состояния и требований платформы.',
    all: 'Все',
    instagram: 'Instagram',
    facebook: 'Facebook',
    x: 'X / Twitter',
    recovery: 'Разблокировка',
    reputation: 'Репутация',
    security: 'Безопасность',
    consulting: 'Инструкции',
    featured: 'Популярное',
    select: 'Добавить услугу',
    selected: 'Добавлено',
    serviceRequest: 'Получить верификацию',
    duration: 'Срок',
    requestCount: 'выбрано',
    openRequest: 'Продолжить заявку',
    aboutKicker: 'Почему обращаются к нам',
    aboutTitle: 'Понятные сценарии до начала работы.',
    aboutText: 'Показываем, как проходит процесс, что нужно от вас и какой результат вы получите. Без сложных терминов — просто и понятно.',
    about1Title: 'Индивидуальная оценка',
    about1Text: 'Проверяем состояние аккаунта, доступность верификации, историю апелляций и возможные риски до согласования формата работы.',
    about2Title: 'Прозрачные условия',
    about2Text: 'До старта вы знаете предполагаемый маршрут, сроки и коммерческие условия. Без сюрпризов в середине процесса.',
    about3Title: 'Сопровождение до результата',
    about3Text: 'Команда остаётся на связи в процессе и объясняет дальнейшие действия после завершения работы.',
    about1Note: 'Чёткий план и честный ответ',
    about2Note: 'Вы всегда знаете, за что платите',
    about3Note: 'Поддержка до финального результата',
    statsTitleA: 'Реальные результаты и опыт,',
    statsTitleB: 'которому доверяют.',
    processNote1: '1–2 минуты',
    processNote2: 'Обычно 1–24 часа',
    processNote3: 'Прозрачно и без скрытых платежей',
    processNote4: 'Проверено опытом',
    statsKicker: 'Опыт',
    statsTitle: 'Реальные результаты и опыт, которому доверяют.',
    processKicker: 'Как проходит работа',
    processTitle: 'От заявки до результата всего 4 простых шага.',
    processText: 'Никаких сложных действий. Вы оставляете заявку — остальное мы берём на себя. Всё прозрачно, безопасно и с поддержкой на каждом этапе.',
    step1Title: 'Заявка',
    step1Text: 'Оставьте заявку, выберите услугу и кратко опишите вашу задачу.',
    step2Title: 'Первичная оценка',
    step2Text: 'Мы проверяем аккаунт, уточняем детали и предлагаем оптимальное решение.',
    step3Title: 'Согласование',
    step3Text: 'Вы получаете понятный план, сроки, условия и итоговую стоимость. После подтверждения мы начинаем работу.',
    step4Title: 'Результат и поддержка',
    step4Text: 'Вы получаете готовый результат, а мы остаёмся на связи и помогаем при необходимости.',
    faqKicker: 'Частые вопросы',
    faqTitle: 'Что важно знать до начала работы.',
    faqText: 'Короткие ответы о форматах верификации, подписках, восстановлении аккаунтов, безопасности и отправке заявки.',
    contactKicker: 'Оценка кейса',
    contactTitle: 'Не уверены, какая услуга подходит?',
    contactText: 'Отправьте структурированную заявку со ссылкой на аккаунт и кратким описанием ситуации. Команда изучит кейс и свяжется с вами напрямую.',
    requestTitle: 'Получить оценку кейса',
    requestText: 'Выберите услуги, добавьте ссылки на аккаунты и укажите срочность.',
    name: 'Имя',
    namePlaceholder: 'Как к вам обращаться?',
    contact: 'Контакт',
    contactPlaceholder: '@telegram, email или телефон',
    clientType: 'Тип клиента',
    individual: 'Частное лицо',
    business: 'Бизнес',
    agency: 'Агентство / партнёр',
    urgency: 'Срочность',
    normal: 'Стандартно',
    urgent: 'Срочно',
    flexible: 'Не срочно',
    accountLinks: 'Ссылки на аккаунты',
    accountPlaceholder: 'https://instagram.com/...',
    addAccount: 'Добавить ещё аккаунт',
    details: 'Описание ситуации',
    detailsPlaceholder: 'Опишите текущее состояние аккаунта, желаемый результат и что уже пробовали сделать.',
    servicesField: 'Услуги',
    submit: 'Отправить заявку',
    submitting: 'Отправка...',
    successTitle: 'Заявка получена',
    successText: 'Заявка доставлена команде в Telegram. Теперь мы можем изучить детали и связаться с вами по указанному контакту.',
    errorTitle: 'Не удалось отправить заявку',
    close: 'Закрыть',
    emptyServices: 'Выберите хотя бы одну услугу',
    privacy: 'Платёжные данные и данные банковских карт на сайте не собираются.',
    menu: 'Меню',
    languageLabel: 'Язык',
    currencyLabel: 'Валюта',
    themeLabel: 'Тема',
    ruble: 'RUB · ₽',
    dollar: 'USD · $',
    lightTheme: 'Светлая',
    darkTheme: 'Тёмная',
    serviceDetails: 'Подробнее',
    serviceDetailsClose: 'Скрыть детали'
  }
}

function App() {
  const [Config, SetConfig] = useState(null)
  const [Language, SetLanguage] = useState(() => localStorage.getItem('veriblue-language') || 'en')
  const [Theme, SetTheme] = useState(() => localStorage.getItem('veriblue-theme') || 'dark')
  const [Currency, SetCurrency] = useState(() => localStorage.getItem('veriblue-currency') || 'RUB')
  const [Filter, SetFilter] = useState('all')
  const [SelectedServiceIds, SetSelectedServiceIds] = useState([])
  const [RequestOpen, SetRequestOpen] = useState(false)
  const [MobileOpen, SetMobileOpen] = useState(false)
  const [LanguageOpen, SetLanguageOpen] = useState(false)
  const [CurrencyOpen, SetCurrencyOpen] = useState(false)
  const [FooterVisible, SetFooterVisible] = useState(false)
  const FooterReference = useRef(null)
  const LanguageReference = useRef(null)
  const CurrencyReference = useRef(null)
  const T = Translations[Language]

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}config.json`).then(Response => Response.json()).then(SetConfig)
  }, [])


  useEffect(() => {
    if (!Config) return

    const Seo = Config.seo || {}
    const Brand = Config.brand || {}
    const TitleSuffix = Text(Seo.titleSuffix, Language) || Text(Brand.tagline, Language)
    const Title = TitleSuffix ? `${Brand.name} · ${TitleSuffix}` : Brand.name
    const Description = Text(Seo.description, Language)
    const Keywords = Text(Seo.keywords, Language)
    const SiteUrl = Seo.siteUrl || window.location.href.split('#')[0]
    const TabSuffix = Text(Seo.tabSuffix, Language) || TitleSuffix
    const BrowserTitle = TabSuffix ? `${Brand.name} · ${TabSuffix}` : Brand.name

    document.title = BrowserTitle
    SetMetaContent('meta[name="theme-color"]', Brand.icon?.background || '#6f63f6')
    SetMetaContent('meta[name="description"]', Description)
    SetMetaContent('meta[name="keywords"]', Array.isArray(Keywords) ? Keywords.join(', ') : Keywords)
    SetMetaContent('meta[name="robots"]', Seo.robots)
    SetMetaContent('meta[property="og:title"]', Title)
    SetMetaContent('meta[property="og:description"]', Description)
    SetMetaContent('meta[property="og:site_name"]', Brand.name)
    SetMetaContent('meta[property="og:url"]', SiteUrl)
    SetMetaContent('meta[name="twitter:title"]', Title)
    SetMetaContent('meta[name="twitter:description"]', Description)
    SetLinkHref('link[rel="canonical"]', SiteUrl)

    const Favicon = document.querySelector('link[rel="icon"]')
    if (Favicon) Favicon.href = CreateBrandFavicon(Brand)

    let StructuredData = document.getElementById('site-structured-data')
    if (!StructuredData) {
      StructuredData = document.createElement('script')
      StructuredData.id = 'site-structured-data'
      StructuredData.type = 'application/ld+json'
      document.head.appendChild(StructuredData)
    }
    StructuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: Brand.name,
      url: SiteUrl,
      description: Description,
      email: Config.contacts?.email || undefined,
      sameAs: [Config.contacts?.telegramUrl].filter(Boolean),
      areaServed: 'Worldwide',
      serviceType: [
        'Social media verification assistance',
        'Account recovery assistance',
        'Digital reputation protection'
      ]
    })
  }, [Config, Language])

  useEffect(() => {
    document.documentElement.dataset.theme = Theme
    localStorage.setItem('veriblue-theme', Theme)
  }, [Theme])

  useEffect(() => {
    document.documentElement.lang = Language
    localStorage.setItem('veriblue-language', Language)
  }, [Language])

  useEffect(() => {
    localStorage.setItem('veriblue-currency', Currency)
  }, [Currency])

  useEffect(() => {
    const HandlePointerDown = Event => {
      if (LanguageReference.current && !LanguageReference.current.contains(Event.target)) SetLanguageOpen(false)
      if (CurrencyReference.current && !CurrencyReference.current.contains(Event.target)) SetCurrencyOpen(false)
    }
    document.addEventListener('pointerdown', HandlePointerDown)
    return () => document.removeEventListener('pointerdown', HandlePointerDown)
  }, [])

  const OverlayOpen = RequestOpen || MobileOpen

  useEffect(() => {
    if (!OverlayOpen) return undefined

    const Html = document.documentElement
    const Body = document.body
    const ScrollbarWidth = window.innerWidth - Html.clientWidth

    const PreviousHtmlOverflow = Html.style.overflow
    const PreviousHtmlOverscroll = Html.style.overscrollBehavior
    const PreviousBodyOverflow = Body.style.overflow
    const PreviousBodyOverscroll = Body.style.overscrollBehavior
    const PreviousBodyPaddingRight = Body.style.paddingRight

    Html.style.overflow = 'hidden'
    Html.style.overscrollBehavior = 'none'
    Body.style.overflow = 'hidden'
    Body.style.overscrollBehavior = 'none'

    if (ScrollbarWidth > 0) Body.style.paddingRight = `${ScrollbarWidth}px`

    return () => {
      Html.style.overflow = PreviousHtmlOverflow
      Html.style.overscrollBehavior = PreviousHtmlOverscroll
      Body.style.overflow = PreviousBodyOverflow
      Body.style.overscrollBehavior = PreviousBodyOverscroll
      Body.style.paddingRight = PreviousBodyPaddingRight
    }
  }, [OverlayOpen])

  useEffect(() => {
    if (!FooterReference.current) return undefined
    const Observer = new IntersectionObserver(Entries => SetFooterVisible(Entries.some(Entry => Entry.isIntersecting)), { threshold: 0.05 })
    Observer.observe(FooterReference.current)
    return () => Observer.disconnect()
  }, [Config])



  useEffect(() => {
    if (!Config) return undefined

    const AnimatedRegions = Array.from(document.querySelectorAll('main > section, footer'))
    const IsMobile = window.matchMedia('(max-width: 720px)').matches
    const RootMargin = IsMobile ? '120px 0px 120px 0px' : '220px 0px 220px 0px'

    const SetRegionState = (Element, IsActive) => {
      Element.classList.toggle('viewportAnimationPaused', !IsActive)
      Element.classList.toggle('viewportAnimationActive', IsActive)
    }

    AnimatedRegions.forEach(Element => {
      Element.classList.add('viewportAnimationRegion')
      SetRegionState(Element, false)
    })

    const RegionObserver = new IntersectionObserver(Entries => {
      Entries.forEach(Entry => SetRegionState(Entry.target, Entry.isIntersecting))
    }, {
      threshold: 0.01,
      rootMargin: RootMargin
    })

    AnimatedRegions.forEach(Element => RegionObserver.observe(Element))

    const HandleVisibility = () => {
      document.documentElement.classList.toggle('documentAnimationPaused', document.hidden)
    }

    HandleVisibility()
    document.addEventListener('visibilitychange', HandleVisibility)

    return () => {
      RegionObserver.disconnect()
      document.removeEventListener('visibilitychange', HandleVisibility)
      document.documentElement.classList.remove('documentAnimationPaused')
      AnimatedRegions.forEach(Element => {
        Element.classList.remove('viewportAnimationRegion', 'viewportAnimationPaused', 'viewportAnimationActive')
      })
    }
  }, [Config])

  useEffect(() => {
    if (!Config) return undefined

    const RevealElements = Array.from(document.querySelectorAll(
      '.sectionHeading, .serviceCard, .aboutCard, .statCard, .processCard, .faqRow, .contactCard'
    ))

    RevealElements.forEach((Element, Index) => {
      Element.classList.add('revealItem')
      Element.style.setProperty('--RevealDelay', `${Math.min((Index % 8) * 55, 330)}ms`)
    })

    const RevealObserver = new IntersectionObserver(Entries => {
      Entries.forEach(Entry => {
        if (!Entry.isIntersecting) return
        Entry.target.classList.add('revealVisible')
        RevealObserver.unobserve(Entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' })

    RevealElements.forEach(Element => RevealObserver.observe(Element))
    return () => RevealObserver.disconnect()
  }, [Config, Filter, Language])

  useEffect(() => {
    let FrameId = 0
    let ScrollFrameId = 0
    const HasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const UpdatePointer = Event => {
      if (!HasFinePointer || document.hidden) return
      if (FrameId) cancelAnimationFrame(FrameId)
      FrameId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--PointerX', `${Event.clientX}px`)
        document.documentElement.style.setProperty('--PointerY', `${Event.clientY}px`)
        document.documentElement.style.setProperty('--PointerMoveX', `${(Event.clientX / window.innerWidth - 0.5) * 28}px`)
        document.documentElement.style.setProperty('--PointerMoveY', `${(Event.clientY / window.innerHeight - 0.5) * 28}px`)
      })
    }

    const UpdateScroll = () => {
      if (ScrollFrameId || document.hidden) return
      ScrollFrameId = requestAnimationFrame(() => {
        const Scrollable = document.documentElement.scrollHeight - window.innerHeight
        const Progress = Scrollable > 0 ? Math.min(window.scrollY / Scrollable, 1) : 0
        document.documentElement.style.setProperty('--ScrollProgress', `${Progress * 100}%`)
        ScrollFrameId = 0
      })
    }

    if (HasFinePointer) window.addEventListener('pointermove', UpdatePointer, { passive: true })
    window.addEventListener('scroll', UpdateScroll, { passive: true })
    UpdateScroll()

    return () => {
      if (FrameId) cancelAnimationFrame(FrameId)
      if (ScrollFrameId) cancelAnimationFrame(ScrollFrameId)
      if (HasFinePointer) window.removeEventListener('pointermove', UpdatePointer)
      window.removeEventListener('scroll', UpdateScroll)
    }
  }, [])

  const FilteredServices = useMemo(() => {
    if (!Config) return []
    if (Filter === 'all') return Config.services
    return Config.services.filter(Service => Service.platform === Filter || Service.category === Filter)
  }, [Config, Filter])

  const ToggleService = ServiceId => {
    SetSelectedServiceIds(CurrentIds => CurrentIds.includes(ServiceId)
      ? CurrentIds.filter(CurrentId => CurrentId !== ServiceId)
      : [...CurrentIds, ServiceId])
  }

  const OpenRequestWithService = ServiceId => {
    SetSelectedServiceIds(CurrentIds => CurrentIds.includes(ServiceId) ? CurrentIds : [...CurrentIds, ServiceId])
    SetRequestOpen(true)
  }

  const ScrollToSection = SectionId => {
    const Target = document.getElementById(SectionId)
    if (!Target) return
    Target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const CloseMenuAndScroll = SectionId => {
    SetMobileOpen(false)
    window.setTimeout(() => ScrollToSection(SectionId), 40)
  }

  if (!Config) return <div className="loadingScreen"><div className="loadingMark"><BadgeCheck size={28} /></div></div>

  const Filters = [
    ['all', T.all],
    ['instagram', T.instagram],
    ['facebook', T.facebook],
    ['x', T.x],
    ['recovery', T.recovery],
    ['reputation', T.reputation],
    ['consulting', T.consulting]
  ]

  const AboutItems = [
    [ShieldCheck, T.about1Title, T.about1Text, T.about1Note],
    [BadgeCheck, T.about2Title, T.about2Text, T.about2Note],
    [Send, T.about3Title, T.about3Text, T.about3Note]
  ]

  const ProcessItems = [
    [T.step1Title, T.step1Text, T.processNote1],
    [T.step2Title, T.step2Text, T.processNote2],
    [T.step3Title, T.step3Text, T.processNote3],
    [T.step4Title, T.step4Text, T.processNote4]
  ]

  const StatIcons = [Users, ShieldCheck, RefreshCw, LockKeyhole]
  const ProcessIcons = [Send, FileText, ShieldCheck, BarChart3]

  return (
    <>
      <div className="scrollProgress" aria-hidden="true" />
      <div className="ambientBackground" aria-hidden="true">
        <span className="ambientOrb ambientOrbOne" />
        <span className="ambientOrb ambientOrbTwo" />
        <span className="ambientOrb ambientOrbThree" />
        <span className="ambientBeam ambientBeamOne" />
        <span className="ambientBeam ambientBeamTwo" />
        <span className="ambientNoise" />
      </div>
      <header className="siteHeader">
        <div className="container headerInner">
          <a className="brand" href="#top" onClick={Event => { Event.preventDefault(); ScrollToSection('top') }}>
            <BrandMark Brand={Config.brand} size={20} />
            <span>{Config.brand.name}</span>
          </a>
          <nav className={`navLinks ${MobileOpen ? 'navLinksOpen' : ''}`}>
            <a href="#services" onClick={Event => { Event.preventDefault(); ScrollToSection('services') }}>{T.navServices}</a>
            <a href="#about" onClick={Event => { Event.preventDefault(); ScrollToSection('about') }}>{T.navAbout}</a>
            <a href="#process" onClick={Event => { Event.preventDefault(); ScrollToSection('process') }}>{T.navProcess}</a>
            <a href="#faq" onClick={Event => { Event.preventDefault(); ScrollToSection('faq') }}>{T.navFaq}</a>
            <a href="#contact" onClick={Event => { Event.preventDefault(); ScrollToSection('contact') }}>{T.navContact}</a>
          </nav>
          <div className="headerControls">
            <div className="languagePicker" ref={LanguageReference}>
              <button className={`controlButton languageButton ${LanguageOpen ? 'active' : ''}`} onClick={() => SetLanguageOpen(!LanguageOpen)} aria-haspopup="menu" aria-expanded={LanguageOpen}><Globe2 size={16} /><span>{Language.toUpperCase()}</span><ChevronDown size={14} /></button>
              {LanguageOpen && <div className="languageMenu" role="menu">
                <button className={Language === 'en' ? 'active' : ''} onClick={() => { SetLanguage('en'); SetLanguageOpen(false) }}><span>EN</span><b>English</b>{Language === 'en' && <Check size={15} />}</button>
                <button className={Language === 'ru' ? 'active' : ''} onClick={() => { SetLanguage('ru'); SetLanguageOpen(false) }}><span>RU</span><b>Русский</b>{Language === 'ru' && <Check size={15} />}</button>
              </div>}
            </div>
            <div className="currencyPicker" ref={CurrencyReference}>
              <button className={`controlButton currencyButton ${CurrencyOpen ? 'active' : ''}`} onClick={() => { SetCurrencyOpen(!CurrencyOpen); SetLanguageOpen(false) }} aria-haspopup="menu" aria-expanded={CurrencyOpen}><DollarSign size={15} /><span>{Currency}</span><ChevronDown size={14} /></button>
              {CurrencyOpen && <div className="languageMenu currencyMenu" role="menu">
                <button className={Currency === 'RUB' ? 'active' : ''} onClick={() => { SetCurrency('RUB'); SetCurrencyOpen(false) }}><span>₽</span><b>{T.ruble}</b>{Currency === 'RUB' && <Check size={15} />}</button>
                <button className={Currency === 'USD' ? 'active' : ''} onClick={() => { SetCurrency('USD'); SetCurrencyOpen(false) }}><span>$</span><b>{T.dollar}</b>{Currency === 'USD' && <Check size={15} />}</button>
              </div>}
            </div>
            <button className="controlButton themeButton" onClick={() => SetTheme(Theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{Theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
            <button className="button buttonPrimary headerRequest" onClick={() => SetRequestOpen(true)}>{T.heroSecondary}</button>
            <button className="controlButton menuButton" onClick={() => SetMobileOpen(!MobileOpen)} aria-label={T.menu}>{MobileOpen ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
      </header>

      {MobileOpen && <div className="mobileMenuOverlay" role="dialog" aria-modal="true" aria-label={T.menu}>
        <div className="mobileMenuBackdrop" />
        <div className="mobileMenuContent">
          <div className="mobileMenuTop"><div className="brand"><BrandMark Brand={Config.brand} size={20} /><span>{Config.brand.name}</span></div><button className="controlButton mobileMenuClose" onClick={() => SetMobileOpen(false)} aria-label={T.close}><X size={21} /></button></div>
          <nav className="mobileMenuNav">
            <a href="#services" onClick={Event => { Event.preventDefault(); CloseMenuAndScroll('services') }}>{T.navServices}<ArrowRight size={21} /></a>
            <a href="#about" onClick={Event => { Event.preventDefault(); CloseMenuAndScroll('about') }}>{T.navAbout}<ArrowRight size={21} /></a>
            <a href="#process" onClick={Event => { Event.preventDefault(); CloseMenuAndScroll('process') }}>{T.navProcess}<ArrowRight size={21} /></a>
            <a href="#faq" onClick={Event => { Event.preventDefault(); CloseMenuAndScroll('faq') }}>{T.navFaq}<ArrowRight size={21} /></a>
            <a href="#contact" onClick={Event => { Event.preventDefault(); CloseMenuAndScroll('contact') }}>{T.navContact}<ArrowRight size={21} /></a>
          </nav>
          <div className="mobileMenuSettings">
            <div className="mobileSettingGroup"><span>{T.languageLabel}</span><div className="mobileChoiceRow"><button className={Language === 'ru' ? 'active' : ''} onClick={() => SetLanguage('ru')}>RU · Русский</button><button className={Language === 'en' ? 'active' : ''} onClick={() => SetLanguage('en')}>EN · English</button></div></div>
            <div className="mobileSettingGroup"><span>{T.currencyLabel}</span><div className="mobileChoiceRow"><button className={Currency === 'RUB' ? 'active' : ''} onClick={() => SetCurrency('RUB')}>₽ RUB</button><button className={Currency === 'USD' ? 'active' : ''} onClick={() => SetCurrency('USD')}>$ USD</button></div></div>
            <div className="mobileSettingGroup"><span>{T.themeLabel}</span><button className="mobileThemeButton" onClick={() => SetTheme(Theme === 'dark' ? 'light' : 'dark')}>{Theme === 'dark' ? <><Sun size={18} />{T.lightTheme}</> : <><Moon size={18} />{T.darkTheme}</>}</button></div>
          </div>
          <button className="button buttonPrimary mobileMenuCta" onClick={() => { SetMobileOpen(false); SetRequestOpen(true) }}>{T.heroSecondary}<ArrowRight size={18} /></button>
        </div>
      </div>}

      <main id="top">
        <section className="heroSection">
          <div className="heroGlow heroGlowOne" />
          <div className="heroGlow heroGlowTwo" />
          <div className="container heroGrid">
            <div className="heroCopy">
              <span className="heroKicker"><Sparkles size={15} />{T.heroKicker}</span>
              <h1>{T.heroTitleA}<span>{T.heroTitleB}</span></h1>
              <p>{T.heroText}</p>
              <div className="heroActions">
                <a className="button buttonPrimary buttonLarge" href="#services" onClick={Event => { Event.preventDefault(); ScrollToSection('services') }}>{T.heroPrimary}<ArrowRight size={18} /></a>
                <button className="button buttonGhost buttonLarge" onClick={() => SetRequestOpen(true)}>{T.heroSecondary}</button>
              </div>
              <div className="trustStrip">
                <span><Check size={15} />{T.noPayment}</span>
                <span><Check size={15} />{T.humanSupport}</span>
                <span><Check size={15} />{T.existingNew}</span>
              </div>
            </div>
            <div className="heroVisual" aria-hidden="true">
              <div className="visualOrbit orbitOne"><i className="orbitNode orbitNodeOne" /><i className="orbitNode orbitNodeTwo" /></div>
              <div className="visualOrbit orbitTwo"><i className="orbitNode orbitNodeThree" /><i className="orbitNode orbitNodeFour" /></div>
              <div className="heroParticle heroParticleOne" />
              <div className="heroParticle heroParticleTwo" />
              <div className="heroParticle heroParticleThree" />
              <div className="heroParticle heroParticleFour" />
              <div className="heroSignal heroSignalOne"><span>LIVE</span><i /></div>
              <div className="profileCard">
                <div className="profileTop"><span className="miniDots"><i /><i /><i /></span><span>verified profile</span></div>
                <div className="profileAvatar"><Instagram size={34} /></div>
                <div className="profileName"><b>@official.profile</b><BadgeCheck size={18} /></div>
                <div className="profileLine wide" /><div className="profileLine" /><div className="profileLine short" />
                <div className="profileStats"><span><b>24.8K</b> followers</span><span><b>Verified</b> status</span></div>
              </div>
              <div className="statusCard"><span className="statusIcon"><ShieldCheck size={21} /></span><div><b>Identity protected</b><small>Verified profile status</small></div><Check size={18} /></div>
              <div className="floatingBadge"><BadgeCheck size={19} />Verified</div>
            </div>
          </div>
        </section>

        <section id="services" className="servicesSection">
          <div className="container">
            <SectionHeading kicker={T.servicesKicker} title={T.servicesTitle} text={T.servicesText} />
            <div className="filterBar">{Filters.map(([FilterId, Label]) => <button key={FilterId} className={Filter === FilterId ? 'active' : ''} onClick={() => SetFilter(FilterId)}>{Label}</button>)}</div>
            <div className="serviceGrid">
              {FilteredServices.map(Service => <ServiceCard key={Service.id} service={Service} language={Language} currency={Currency} t={T} selected={SelectedServiceIds.includes(Service.id)} onToggle={() => ToggleService(Service.id)} onOpen={() => OpenRequestWithService(Service.id)} />)}
            </div>
          </div>
        </section>

        <section id="about" className="aboutSection">
          <div className="container">
            <SectionHeading kicker={T.aboutKicker} title={T.aboutTitle} text={T.aboutText} />
            <div className="aboutGrid">
              {AboutItems.map(([Icon, Title, Description, Note]) => <article className="aboutCard" key={Title}><span><Icon size={21} /></span><h3>{Title}</h3><p>{Description}</p><div className="aboutNote"><span className="aboutNoteCheck"><Check size={15} /></span>{Note}</div></article>)}
            </div>
          </div>
        </section>

        <section className="statsSection">
          <div className="container">
            <div className="statsHeading"><span className="sectionKicker">{T.statsKicker}</span><h2>{T.statsTitleA} <span>{T.statsTitleB}</span></h2><div className="statsShield" aria-hidden="true"><ShieldCheck size={92} /></div></div>
            <div className="statsGrid">{Config.stats.map((Stat, StatIndex) => { const StatIcon = StatIcons[StatIndex]; return <div className="statCard" key={Stat.value + Text(Stat.label, Language)}><span className="statIcon"><StatIcon size={25} /></span><div><b>{Stat.value}</b><span>{Text(Stat.label, Language)}</span></div></div> })}</div>
          </div>
        </section>

        <section id="process" className="processSection">
          <div className="container">
            <SectionHeading kicker={T.processKicker} title={T.processTitle} text={T.processText} />
            <div className="processGrid">{ProcessItems.map((Step, StepIndex) => { const ProcessIcon = ProcessIcons[StepIndex]; return <div className="processCard" key={Step[0]}><div className="processCardTop"><span className="processIcon"><ProcessIcon size={25} /></span><span className="processNumber">{String(StepIndex + 1).padStart(2, '0')}</span></div><h3>{Step[0]}</h3><p>{Step[1]}</p><div className="processNote">{Step[2]}</div></div> })}</div>
          </div>
        </section>

        <section className="faqSection" id="faq">
          <div className="container faqGrid">
            <div><SectionHeading kicker={T.faqKicker} title={T.faqTitle} text={T.faqText} /></div>
            <div className="faqList">{Config.faq.map((FaqItem, FaqIndex) => <FaqRow key={FaqIndex} item={FaqItem} language={Language} />)}</div>
          </div>
        </section>

        <section id="contact" className="contactSection">
          <div className="container">
            <div className="contactCard">
              <div><span className="sectionKicker">{T.contactKicker}</span><h2>{T.contactTitle}</h2><p>{T.contactText}</p></div>
              <div className="contactActions">
                <button className="button buttonPrimary" onClick={() => SetRequestOpen(true)}>{T.heroSecondary}<ArrowRight size={17} /></button>
                <a className="button buttonGhost" href={Config.contacts.telegramUrl} target="_blank" rel="noreferrer"><Send size={17} />{Config.contacts.telegram}</a>
                <a className="button buttonGhost" href={`mailto:${Config.contacts.email}`}><Mail size={17} />{Config.contacts.email}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer ref={FooterReference}>
        <div className="container footerInner">
          <div className="footerBrand"><div className="brand"><BrandMark Brand={Config.brand} size={16} small /><span>{Config.brand.name}</span></div><span>{Text(Config.brand.tagline, Language)}</span></div>
          <div className="footerLegal"><span>{Text(Config.legal?.privacy, Language) || T.privacy}</span><span>{Interpolate(Text(Config.legal?.disclaimer, Language), { brand: Config.brand.name })}</span></div>
        </div>
      </footer>

      {SelectedServiceIds.length > 0 && !RequestOpen && !FooterVisible && <div className="selectionBar"><div><b>{SelectedServiceIds.length}</b><span>{T.requestCount}</span></div><button className="button buttonPrimary" onClick={() => SetRequestOpen(true)}>{T.openRequest}<ArrowRight size={17} /></button></div>}

      <RequestModal open={RequestOpen} onClose={() => SetRequestOpen(false)} config={Config} language={Language} t={T} selectedServiceIds={SelectedServiceIds} setSelectedServiceIds={SetSelectedServiceIds} />
    </>
  )
}

function SectionHeading({ kicker, title, text }) {
  return <div className="sectionHeading"><span className="sectionKicker">{kicker}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function ServiceCard({ service, language, currency, t, selected, onToggle, onOpen }) {
  const FormatPrice = PriceMap => {
    const Value = PriceMap?.[currency]
    if (Value === null || Value === undefined) return Text(service.priceLabel, language)
    if (currency === 'USD') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Value)
    return new Intl.NumberFormat(language === 'ru' ? 'ru-RU' : 'en-US').format(Value) + ' ₽'
  }
  const Price = FormatPrice(service.price)
  const OldPrice = service.oldPrice?.[currency] ? FormatPrice(service.oldPrice) : null
  const Features = service.features?.[language] ?? service.features?.en ?? []
  const PlatformLabel = service.platform === 'multi' ? (language === 'ru' ? 'Несколько платформ' : 'Multi-platform') : service.platform
  return (
    <article className={`serviceCard ${service.featured ? 'featured' : ''} ${selected ? 'selected' : ''}`}>
      <div className="serviceTop"><span className={`platformBadge platform-${service.platform}`}>{PlatformLabel}</span>{service.featured && <span className="popularBadge"><Sparkles size={12} />{t.featured}</span>}</div>
      <h3>{Text(service.title, language)}</h3>
      <p className="serviceDescription desktopServiceDetails">{Text(service.description, language)}</p>
      <div className="priceRow"><b>{Price}</b>{OldPrice && <span>{OldPrice}</span>}</div>
      {service.priceNote && <div className="priceNote desktopServiceDetails">{Text(service.priceNote, language)}</div>}
      <div className="durationRow"><span>{t.duration}</span><b>{Text(service.duration, language)}</b></div>
      <ul className="desktopServiceDetails">{Features.map(Feature => <li key={Feature}><Check size={15} />{Feature}</li>)}</ul>
      <details className="mobileServiceDetails">
        <summary>{t.serviceDetails}<ChevronDown size={16} /></summary>
        <div className="mobileServiceDetailsBody">
          <p>{Text(service.description, language)}</p>
          {service.priceNote && <div className="priceNote">{Text(service.priceNote, language)}</div>}
          <ul>{Features.map(Feature => <li key={Feature}><Check size={15} />{Feature}</li>)}</ul>
        </div>
      </details>
      <div className="serviceActions"><button className="button buttonPrimary serviceRequestButton" onClick={onOpen}>{t.serviceRequest}<ArrowRight size={17} /></button><button className={`roundButton addServiceButton ${selected ? 'selected' : ''}`} onClick={onToggle} aria-label={selected ? t.selected : t.select}>{selected ? <Check size={18} /> : <Plus size={19} />}</button></div>
    </article>
  )
}

function FaqRow({ item, language }) {
  const [Open, SetOpen] = useState(false)
  return <div className={`faqRow ${Open ? 'open' : ''}`}><button onClick={() => SetOpen(!Open)}><span>{Text(item.question, language)}</span><ChevronDown size={20} /></button>{Open && <p>{Text(item.answer, language)}</p>}</div>
}

function RequestModal({ open, onClose, config, language, t, selectedServiceIds, setSelectedServiceIds }) {
  const [Name, SetName] = useState('')
  const [Contact, SetContact] = useState('')
  const [ClientType, SetClientType] = useState('individual')
  const [Urgency, SetUrgency] = useState('normal')
  const [AccountLinks, SetAccountLinks] = useState([''])
  const [Details, SetDetails] = useState('')
  const [Status, SetStatus] = useState('idle')
  const [ErrorMessage, SetErrorMessage] = useState('')

  useEffect(() => {
    if (!open) {
      SetStatus('idle')
      SetErrorMessage('')
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const HandleKeyDown = Event => {
      if (Event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', HandleKeyDown)
    return () => window.removeEventListener('keydown', HandleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const SelectedServices = config.services.filter(Service => selectedServiceIds.includes(Service.id))
  const ToggleService = ServiceId => setSelectedServiceIds(CurrentIds => CurrentIds.includes(ServiceId) ? CurrentIds.filter(CurrentId => CurrentId !== ServiceId) : [...CurrentIds, ServiceId])

  const SubmitRequest = async Event => {
    Event.preventDefault()
    if (selectedServiceIds.length === 0) {
      SetStatus('error')
      SetErrorMessage(t.emptyServices)
      return
    }

    SetStatus('loading')
    SetErrorMessage('')

    try {
      const Response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: Name.trim(),
          contact: Contact.trim(),
          language,
          clientType: t[ClientType],
          urgency: t[Urgency],
          serviceIds: selectedServiceIds,
          accountLinks: AccountLinks.map(AccountLink => AccountLink.trim()).filter(Boolean),
          details: Details.trim()
        })
      })
      const ResponseText = await Response.text()
      let Result = null

      if (ResponseText) {
        try {
          Result = JSON.parse(ResponseText)
        } catch {
          Result = null
        }
      }

      if (!Response.ok || !Result?.ok) {
        const ErrorMessage = Result?.error || (Response.status === 503
          ? 'Telegram bot is not configured'
          : Response.status === 502
            ? 'Telegram is temporarily unavailable'
            : `Server error (${Response.status})`)
        throw new Error(ErrorMessage)
      }

      SetStatus('success')
    } catch (Error) {
      SetStatus('error')
      SetErrorMessage(Error.message === 'Failed to fetch'
        ? 'Request server is unavailable. Start the backend with npm run dev or npm run server.'
        : Error.message)
    }
  }

  return (
    <div className="modalOverlay" onMouseDown={Event => Event.target === Event.currentTarget && onClose()}>
      <div className="requestModal" role="dialog" aria-modal="true">
        <div className="modalHeader"><div><span className="sectionKicker">{t.heroSecondary}</span><h2>{t.requestTitle}</h2><p>{t.requestText}</p></div><button className="iconButton" onClick={onClose}><X size={20} /></button></div>
        {Status === 'success' ? <div className="resultState"><span className="resultIcon"><Check size={28} /></span><h3>{t.successTitle}</h3><p>{t.successText}</p><button className="button buttonPrimary" onClick={onClose}>{t.close}</button></div> : (
          <form onSubmit={SubmitRequest} className="requestForm">
            <div className="formGrid twoColumns"><label><span>{t.name}</span><input required value={Name} onChange={Event => SetName(Event.target.value)} placeholder={t.namePlaceholder} /></label><label><span>{t.contact}</span><input required value={Contact} onChange={Event => SetContact(Event.target.value)} placeholder={t.contactPlaceholder} /></label></div>
            <div className="formGrid twoColumns"><label><span>{t.clientType}</span><select value={ClientType} onChange={Event => SetClientType(Event.target.value)}><option value="individual">{t.individual}</option><option value="business">{t.business}</option><option value="agency">{t.agency}</option></select></label><label><span>{t.urgency}</span><select value={Urgency} onChange={Event => SetUrgency(Event.target.value)}><option value="normal">{t.normal}</option><option value="urgent">{t.urgent}</option><option value="flexible">{t.flexible}</option></select></label></div>
            <fieldset className="serviceSelector"><legend>{t.servicesField}</legend><div className="serviceChecklist">{config.services.map(Service => <label key={Service.id} className={selectedServiceIds.includes(Service.id) ? 'checked' : ''}><input type="checkbox" checked={selectedServiceIds.includes(Service.id)} onChange={() => ToggleService(Service.id)} /><span>{Text(Service.title, language)}</span></label>)}</div></fieldset>
            <div className="formBlock"><label><span>{t.accountLinks}</span>{AccountLinks.map((AccountLink, AccountIndex) => <div className="accountRow" key={AccountIndex}><input value={AccountLink} onChange={Event => SetAccountLinks(CurrentLinks => CurrentLinks.map((CurrentLink, CurrentIndex) => CurrentIndex === AccountIndex ? Event.target.value : CurrentLink))} placeholder={t.accountPlaceholder} />{AccountLinks.length > 1 && <button type="button" className="iconButton smallIcon" onClick={() => SetAccountLinks(CurrentLinks => CurrentLinks.filter((CurrentLink, CurrentIndex) => CurrentIndex !== AccountIndex))}><X size={15} /></button>}</div>)}</label><button type="button" className="textButton" onClick={() => SetAccountLinks(CurrentLinks => [...CurrentLinks, ''])}>+ {t.addAccount}</button></div>
            <div className="formBlock"><label><span>{t.details}</span><textarea value={Details} onChange={Event => SetDetails(Event.target.value)} placeholder={t.detailsPlaceholder} /></label></div>
            {SelectedServices.length > 0 && <div className="selectedSummary">{SelectedServices.map(Service => <span key={Service.id}>{Text(Service.title, language)}<button type="button" onClick={() => ToggleService(Service.id)}><X size={12} /></button></span>)}</div>}
            {Status === 'error' && <div className="errorBox"><b>{t.errorTitle}</b><span>{ErrorMessage}</span></div>}
            <div className="modalFooter"><span>{t.privacy}</span><button className="button buttonPrimary" type="submit" disabled={Status === 'loading'}>{Status === 'loading' ? t.submitting : t.submit}<Send size={16} /></button></div>
          </form>
        )}
      </div>
    </div>
  )
}

export default App
