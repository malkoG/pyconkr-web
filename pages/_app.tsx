import App, { Container } from 'next/app'
import { Provider } from 'mobx-react'
import { MobxStores } from 'lib/stores'
import { serialize, deserialize } from 'serializr'

class MyApp extends App {

  stores: MobxStores
  constructor (props: any) {
    super(props)
    this.stores = deserialize(MobxStores, props.initialState)
  }

  static async getInitialProps (appContext: any) {

    const mobxStores = new MobxStores()

    // Provide the store to getInitialProps of pages
    appContext.ctx.stores = mobxStores

    let  appProps = await App.getInitialProps(appContext)


    return {
      ...appProps,
      initialState: serialize(mobxStores),
    }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Provider stores={this.stores}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default MyApp