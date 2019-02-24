import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { MobxStores } from 'lib/stores'
import { inject, observer } from 'mobx-react'
import { parse } from 'qs'
import React from 'react'

export type IndexPagePropsType = {
  stores: MobxStores;
}

@inject('stores')
@observer
class Index extends React.Component<{stores: MobxStores}> {
    async componentDidMount () {
      const { stores } = this.props

      if (location.search.indexOf('code') === -1) return
      const { code } = parse(location.search, { ignoreQueryPrefix: true })
      await stores.getTokenAndSetProfile(code)
    }

    render () {
      const { stores } = this.props

      return (
        <PageTemplate
          header={<Header title='파이콘 한국 2019' />}
          footer={<Footer />}
        >
          <span>Pycon HomePage</span>
        </PageTemplate>
      )
    }
}

export default Index
