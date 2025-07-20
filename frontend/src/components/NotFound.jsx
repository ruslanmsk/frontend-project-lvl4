import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <h3>{t('notFound')}</h3>
  )
}

export default NotFoundPage
