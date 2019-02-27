import Footer from 'components/organisms/Footer'
import Header from 'components/organisms/Header'
import PageTemplate from 'components/templates/PageTemplate'
import { MobxStores } from 'lib/mobx/MobxStores'
import { inject, observer } from 'mobx-react'
import { parse } from 'qs'
import React from 'react'

export type IndexPagePropsType = {
  stores: MobxStores;
}

@inject('stores')
@observer
class Index extends React.Component<{stores: MobxStores}> {

    input: HTMLInputElement | null = null

    async componentDidMount () {
      const { stores } = this.props

      if (location.search.indexOf('code') === -1) return
      const { code } = parse(location.search, { ignoreQueryPrefix: true })
      // await stores.login(code)
      await stores.authStore.setToken(code, 'github')
    }

    onChangeName = () => {
      const { stores } = this.props
      stores.profileStore.setUserName((this.input && this.input.value) || stores.profileStore.username)
    }
    render () {
      const { stores } = this.props
      console.log(stores)

      return (
        <PageTemplate
          header={<Header title='파이콘 한국 2019' />}
          footer={<Footer />}
        >
          <span>Pycon HomePage</span>
          <input type='text' ref={input => this.input = input}/>
          <input type='button' value='Change Name' onClick={this.onChangeName}/>
        </PageTemplate>
      )
    }
}

export default Index
