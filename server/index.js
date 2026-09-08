import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const CurrentFilePath = fileURLToPath(import.meta.url)
const CurrentDirectory = path.dirname(CurrentFilePath)
const ProjectDirectory = path.resolve(CurrentDirectory, '..')
const ConfigPath = path.join(CurrentDirectory, 'server-config.json')
const PublicConfigPath = path.join(ProjectDirectory, 'public', 'config.json')
const DistDirectory = path.join(ProjectDirectory, 'dist')

const LoadJson = FilePath => JSON.parse(fs.readFileSync(FilePath, 'utf8'))
const LoadOptionalJson = FilePath => fs.existsSync(FilePath) ? LoadJson(FilePath) : {}
const ServerConfig = LoadOptionalJson(ConfigPath)
const PublicConfig = LoadJson(PublicConfigPath)
const App = express()
const Port = ServerConfig.server?.port || 3001

App.use(cors())
App.use(express.json({ limit: '256kb' }))

const EscapeHtml = Value => String(Value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const ResolveService = ServiceId => PublicConfig.services.find(CurrentService => CurrentService.id === ServiceId)

const FormatPrice = (Price, Currency = 'RUB') => {
  if (typeof Price !== 'number') return null
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: Currency,
    maximumFractionDigits: 0
  }).format(Price)
}

const FormatServiceLine = ServiceId => {
  const Service = ResolveService(ServiceId)
  if (!Service) return `• ${EscapeHtml(ServiceId)}`

  const ServiceName = Service.title?.ru || Service.title?.en || ServiceId
  const CurrentPriceValue = Service.price?.RUB
  const OldPriceValue = Service.oldPrice?.RUB
  const CurrentPrice = FormatPrice(CurrentPriceValue, 'RUB')
  const OldPrice = FormatPrice(OldPriceValue, 'RUB')
  const PriceLabel = Service.priceLabel?.ru || Service.priceLabel?.en || 'По запросу'

  if (!CurrentPrice) {
    return `• <b>${EscapeHtml(ServiceName)}</b>
  Цена: <b>${EscapeHtml(PriceLabel)}</b>`
  }

  if (!OldPrice || OldPriceValue <= CurrentPriceValue) {
    return `• <b>${EscapeHtml(ServiceName)}</b>
  Актуальная цена: <b>${CurrentPrice}</b>`
  }

  const DiscountPercent = Math.round((1 - CurrentPriceValue / OldPriceValue) * 100)

  return [
    `• <b>${EscapeHtml(ServiceName)}</b>`,
    `  Актуальная цена: <b>${CurrentPrice}</b>`,
    `  Старая цена: <s>${OldPrice}</s>`,
    `  Скидка: <b>${DiscountPercent}%</b>`
  ].join('\n')
}

const BuildTelegramMessage = RequestData => {
  const ServiceLines = RequestData.serviceIds.map(FormatServiceLine)
  const AccountLinks = Array.isArray(RequestData.accountLinks) ? RequestData.accountLinks : []
  const Lines = [
    '<b>Новая заявка VeriBlue</b>',
    '',
    `<b>Имя:</b> ${EscapeHtml(RequestData.name)}`,
    `<b>Контакт:</b> ${EscapeHtml(RequestData.contact)}`,
    `<b>Язык:</b> ${EscapeHtml(RequestData.language)}`,
    `<b>Тип клиента:</b> ${EscapeHtml(RequestData.clientType)}`,
    `<b>Срочность:</b> ${EscapeHtml(RequestData.urgency)}`,
    '',
    '<b>Услуги:</b>',
    ...ServiceLines,
    '',
    '<b>Аккаунты:</b>',
    ...(AccountLinks.length ? AccountLinks.map(AccountLink => `• ${EscapeHtml(AccountLink)}`) : ['• Не указаны']),
    '',
    `<b>Комментарий:</b>\n${EscapeHtml(RequestData.details || 'Не указан')}`
  ]

  return Lines.join('\n')
}

const ValidateRequest = RequestData => {
  if (!RequestData || typeof RequestData !== 'object') return 'Invalid request body'
  if (!String(RequestData.name || '').trim()) return 'Name is required'
  if (!String(RequestData.contact || '').trim()) return 'Contact is required'
  if (!Array.isArray(RequestData.serviceIds) || RequestData.serviceIds.length === 0) return 'At least one service is required'

  const AllowedServiceIds = new Set(PublicConfig.services.map(Service => Service.id))
  if (RequestData.serviceIds.some(ServiceId => !AllowedServiceIds.has(ServiceId))) return 'Unknown service selected'
  if (RequestData.serviceIds.length > 8) return 'Too many services selected'

  return null
}

App.get('/api/health', (Request, Response) => {
  Response.json({ ok: true })
})

App.post('/api/requests', async (Request, Response) => {
  const ValidationError = ValidateRequest(Request.body)
  if (ValidationError) {
    Response.status(400).json({ ok: false, error: ValidationError })
    return
  }

  const BotToken = ServerConfig.telegram?.botToken
  const ChatId = ServerConfig.telegram?.chatId

  if (!BotToken || BotToken === 'PUT_BOT_TOKEN_HERE' || !ChatId || ChatId === 'PUT_CHAT_ID_HERE') {
    Response.status(503).json({ ok: false, error: 'Telegram bot is not configured' })
    return
  }

  try {
    const TelegramResponse = await fetch(`https://api.telegram.org/bot${BotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ChatId,
        text: BuildTelegramMessage(Request.body),
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    })

    const TelegramResult = await TelegramResponse.json()

    if (!TelegramResponse.ok || !TelegramResult.ok) {
      Response.status(502).json({ ok: false, error: 'Telegram rejected the request' })
      return
    }

    Response.json({ ok: true })
  } catch {
    Response.status(502).json({ ok: false, error: 'Telegram is unavailable' })
  }
})

if (fs.existsSync(DistDirectory)) {
  App.use(express.static(DistDirectory))
  App.get('/{*Splat}', (Request, Response) => {
    Response.sendFile(path.join(DistDirectory, 'index.html'))
  })
}

App.listen(Port, () => {
  console.log(`VeriBlue server running on http://localhost:${Port}`)
})
