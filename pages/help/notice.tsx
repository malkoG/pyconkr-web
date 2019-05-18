import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import SponsorBanners from 'components/organisms/SponsorBanners'
import PageTemplate from 'components/templates/PageTemplate'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import { StoresType } from '../_app'

export type IndexPagePropsType = {
  stores: StoresType;
}

@inject('stores')
@observer
export default class Notice extends React.Component<{ stores: StoresType }> {
  render() {
    const { stores } = this.props
    const { sponsors } = toJS(stores.sponsorStore)

    return (
      <PageTemplate
        header={<Header title='알림 :: 파이콘 한국 2019' />}
        sponsorBanners={<SponsorBanners />}
        footer={<Footer />}
      >
        <span>Pycon Sponsors</span>
        {sponsors.map(sponsor => {
          return <div>{sponsor.nameKo}</div>
        })}
      </PageTemplate>
    )
  }
}
