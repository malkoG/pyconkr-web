import React from 'react'
import { inject, observer } from 'mobx-react'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { MobxStores } from 'lib/stores'
import { parse } from 'qs'

export type IndexPagePropsType = {
  stores: MobxStores;
}

@inject('stores')
@observer
class Index extends React.Component<{stores: MobxStores}> {
    async componentDidMount () {
      const { stores } = this.props

      // await stores.authStore.login()
      debugger;
      // if (location.search.indexOf('code') === -1) return
      const { code } = parse(location.search, { ignoreQueryPrefix: true })
      await stores.authStore.getToken(code)
    }

    render () {
      const { stores } = this.props
      console.log(stores)

      return (
      <PageTemplate
        header={<Header />}
        footer={<Footer />}
      >
        <span>Pycon HomePage</span>
      </PageTemplate>
      )
    }
}

export default Index
