import { PageLayout, FlexRowSB } from '@layouts/index'
import { HeaderWrapper, NavLinkStyled } from './components'
import { useTranslation } from 'react-i18next'
import { HOME, SETTINGS } from '@constants/routes'

const Header = () => {
  const { t } = useTranslation()

  return (
    <HeaderWrapper>
      <PageLayout>
        <FlexRowSB>
          <p>Calculator App</p>
          <nav>
            <NavLinkStyled to={HOME}>
              {t('header.home')}
            </NavLinkStyled>
            <NavLinkStyled to={SETTINGS}>
              {t('header.settings')}
            </NavLinkStyled>
          </nav>
        </FlexRowSB>
      </PageLayout>
    </HeaderWrapper>
  )
}

export default Header
