import React from 'react'
import { inject, observer } from 'mobx-react'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { MobxStores } from 'lib/stores'

export type IndexPagePropsType = {
  stores: MobxStores;
}

@inject('stores')
@observer
class Index extends React.Component<{stores: MobxStores}> {
    render () {
      const { stores } = this.props
      console.log(stores.todoStore)

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
