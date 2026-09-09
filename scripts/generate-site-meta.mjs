import fs from 'node:fs'
import path from 'node:path'

const Root = process.cwd()
const ConfigPath = path.join(Root, 'public', 'config.json')
const IndexPath = path.join(Root, 'index.html')
const PublicPath = path.join(Root, 'public')

const Config = JSON.parse(fs.readFileSync(ConfigPath, 'utf8'))
const Brand = Config.brand || {}
const Seo = Config.seo || {}
const Language = Seo.defaultLanguage || 'en'
const Text = Value => Value?.[Language] ?? Value?.en ?? ''
const EscapeHtml = Value => String(Value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const Name = Brand.name || 'Website'
const ShortName = Brand.shortName || Name
const TitleSuffix = Text(Seo.titleSuffix) || Text(Brand.tagline)
const Title = TitleSuffix ? `${Name} · ${TitleSuffix}` : Name
const Description = Text(Seo.description) || Text(Brand.tagline)
const KeywordsValue = Text(Seo.keywords)
const Keywords = Array.isArray(KeywordsValue) ? KeywordsValue.join(', ') : KeywordsValue
const SiteUrl = Seo.siteUrl || ''
const Background = Brand.icon?.background || '#6f63f6'
const Foreground = Brand.icon?.foreground || '#ffffff'

const Favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="${Background}"/><path d="M32 13.5l5.1 3.1 5.9.6 2.2 5.5 4.4 4-1.4 5.8 1.4 5.8-4.4 4-2.2 5.5-5.9.6-5.1 3.1-5.1-3.1-5.9-.6-2.2-5.5-4.4-4 1.4-5.8-1.4-5.8 4.4-4 2.2-5.5 5.9-.6L32 13.5z" fill="none" stroke="${Foreground}" stroke-width="3.2" stroke-linejoin="round"/><path d="M25.8 32.2l4 4 8.6-9" fill="none" stroke="${Foreground}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
fs.writeFileSync(path.join(PublicPath, 'favicon.svg'), Favicon)

const Manifest = {
  name: Name,
  short_name: ShortName,
  description: Description,
  start_url: './',
  scope: './',
  display: 'standalone',
  background_color: '#0b1020',
  theme_color: Background,
  icons: [{
    src: 'favicon.svg',
    sizes: 'any',
    type: 'image/svg+xml',
    purpose: 'any'
  }]
}
fs.writeFileSync(path.join(PublicPath, 'site.webmanifest'), JSON.stringify(Manifest, null, 2) + '\n')

if (SiteUrl) {
  fs.writeFileSync(path.join(PublicPath, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SiteUrl.replace(/\/$/, '')}/sitemap.xml\n`)
  fs.writeFileSync(path.join(PublicPath, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${EscapeHtml(SiteUrl)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`)
}

let Html = fs.readFileSync(IndexPath, 'utf8')
Html = Html
  .replace(/<html lang="[^"]*">/, `<html lang="${EscapeHtml(Language)}">`)
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${EscapeHtml(Title)}</title>`)
  .replace(/<meta name="theme-color" content="[^"]*" \/>/, `<meta name="theme-color" content="${EscapeHtml(Background)}" />`)
  .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${EscapeHtml(Description)}" />`)
  .replace(/<meta name="keywords" content="[^"]*" \/>/, `<meta name="keywords" content="${EscapeHtml(Keywords)}" />`)
  .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${EscapeHtml(Title)}" />`)
  .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${EscapeHtml(Description)}" />`)
  .replace(/<meta property="og:site_name" content="[^"]*" \/>/, `<meta property="og:site_name" content="${EscapeHtml(Name)}" />`)
  .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${EscapeHtml(SiteUrl)}" />`)
  .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${EscapeHtml(Title)}" />`)
  .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${EscapeHtml(Description)}" />`)
  .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${EscapeHtml(SiteUrl)}" />`)
  .replace(/<link rel="icon" type="image\/svg\+xml" href="[^"]*" \/>/, `<link rel="icon" type="image/svg+xml" href="./favicon.svg" />`)
  .replace(/<link rel="manifest" href="[^"]*" \/>/, `<link rel="manifest" href="./site.webmanifest" />`)

fs.writeFileSync(IndexPath, Html)
console.log(`Generated site metadata for ${Name}`)
