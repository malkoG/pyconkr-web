import React from 'react'
import { inject, observer } from 'mobx-react'
import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { MobxStoresType } from 'lib/stores'

@inject('stores')
@observer
class About extends React.Component<{stores: MobxStoresType}> {
    render () {
      const { stores } = this.props

      return (
        <PageTemplate
          header={<Header />}
          footer={<Footer />}
        >
            <span>About Pycon</span>
        </PageTemplate>
      )
    }
}

export default About
