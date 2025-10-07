import WebApp from '@twa-dev/sdk'

const tg = WebApp
export const useTelegram = () => {
  const onClose = () => {
    tg.close()
  }

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }

  const onSecondaryButton = () => {
    if (tg.SecondaryButton.isVisible) {
      tg.SecondaryButton.hide()
    } else {
      tg.SecondaryButton.show()
    }
  }

  return {
    tg,
    onClose,
    onToggleButton,
    onSecondaryButton,
    user: tg.initDataUnsafe?.user,
  }
}
