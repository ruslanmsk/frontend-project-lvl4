import { useTranslation } from "react-i18next";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t('notFound')}</h3>
    </>
  )
};