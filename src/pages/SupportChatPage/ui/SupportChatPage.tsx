import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const SupportChatPage = () => {
  const location = useLocation()
  const [messageText, setMessageText] = useState<string>('')

  useEffect(() => {
    const s = (location.state as { notifyMessage?: string } | null)
      ?.notifyMessage
    setMessageText(s || '')
  }, [location.state])

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          border: '1px solid var(--tg-theme-section-separator-color, #e3e3e3)',
          borderRadius: 12,
          background: 'var(--tg-theme-bg-color, #ffffff)',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 16px - 56px - env(safe-area-inset-bottom))',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '12px 16px',
            borderBottom:
              '1px solid var(--tg-theme-section-separator-color, #e3e3e3)',
            fontWeight: 600,
            color: 'var(--tg-theme-text-color, #000000)',
          }}
        >
          Чат с поддержкой
        </div>

        <div
          style={{
            flex: 1,
            padding: 16,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {messageText && (
            <div
              style={{
                alignSelf: 'flex-start',
                maxWidth: '80%',
                background: 'var(--tg-theme-secondary-bg-color, #f1f1f1)',
                color: 'var(--tg-theme-text-color, #000000)',
                borderRadius: 12,
                padding: '10px 12px',
              }}
            >
              {messageText}
            </div>
          )}
        </div>

        <div
          style={{
            padding: 12,
            borderTop:
              '1px solid var(--tg-theme-section-separator-color, #e3e3e3)',
            display: 'flex',
            gap: 8,
            background: 'var(--tg-theme-bg-color, #ffffff)',
          }}
        >
          <input
            type="text"
            placeholder="Напишите сообщение..."
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 10,
              border:
                '1px solid var(--tg-theme-section-separator-color, #e3e3e3)',
              background: 'transparent',
              color: 'var(--tg-theme-text-color, #000000)',
              outline: 'none',
            }}
          />
          <button
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: 'none',
              background: 'var(--tg-theme-button-color, #3390ec)',
              color: 'var(--tg-theme-button-text-color, #ffffff)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  )
}
