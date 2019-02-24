import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { MobxStores } from 'lib/mobx/MobxStores'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'

export type IndexPagePropsType = {
  stores: MobxStores;
}

@inject('stores')
@observer
export default class Sponsor extends React.Component<{stores: MobxStores}> {
    render () {
      const { stores } = this.props
      const { sponsors } = toJS(stores.sponsorStore)

      return (
        <PageTemplate
          header={<Header title='파이콘 한국 2019' />}
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

