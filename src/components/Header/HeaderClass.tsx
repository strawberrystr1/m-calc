import {
  HOME,
  HOME_CLASS,
  SETTINGS,
} from '@constants/routes'
import { IClassTranslationProps } from '@interfaces/props'
import { FlexRowSB, PageLayout } from '@layouts/index'
import { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { HeaderWrapper, NavLinkStyled } from './components'

class HeaderClass extends Component<IClassTranslationProps> {
  render() {
    const { t } = this.props
    return (
      <HeaderWrapper>
        <PageLayout>
          <FlexRowSB>
            <p>Calculator App</p>
            <nav>
              <NavLinkStyled to={HOME_CLASS}>
                {t('header.class')}
              </NavLinkStyled>
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
}

export default withTranslation()(HeaderClass)
