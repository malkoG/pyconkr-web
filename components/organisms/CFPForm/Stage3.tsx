import { FormWrapper } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { StageButtonGroup } from 'components/organisms/CFPForm/StageButtonGroup'
import { CFPFormStage } from 'lib/stores/CFPStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'

interface State {
  desc: string,
  isPresentedBefore: boolean | null,
  placePresentedBefore: string,
  presentedSlideUrlBefore: string,
  question: string
}

@inject('stores')
@observer
export default class CFPFormStage3 extends React.Component<{stores: StoresType}, State> {
  state = {
    detailDesc: '',
    isPresentedBefore: false,
    placePresentedBefore: '',
    presentedSlideUrlBefore: '',
    comment: ''
  }

  async componentDidMount() {
    const { proposal } = this.props.stores.cfpStore
    if( !proposal ) {
     return
    }
    this.setState({
      detailDesc : proposal.detailDesc,
      isPresentedBefore : proposal.isPresentedBefore,
      placePresentedBefore : proposal.placePresentedBefore,
      backgroundDesc : proposal.backgroundDesc,
      presentedSlideUrlBefore : proposal.presentedSlideUrlBefore,
      comment : proposal.comment
    })
  }

  render () {
    const { stores } = this.props

    return (
      <FormWrapper>
        <form onSubmit={(e) => {
          e.preventDefault()
          stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
            stores.cfpStore.setCurrentStage(CFPFormStage.stage4)
          })
        }}>
          <label><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.sub1'>
            제안의 상세한 내용
          </IntlText></label>
          <p><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item1.desc1'>
            내용이 많을 경우, 외부 문서 링크를 적어주시기 바랍니다.
          </IntlText></p>
          <input
            type='text'
            value={this.state.detailDesc}
            onChange={e => this.setState({ detailDesc: e.target.value })}
            aria-required={true}
            required
          />
          <fieldset>
            <legend><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item2.header'>
              이미 다른 곳에서 발표한 내용인가요?
            </IntlText></legend>
            <input
              type='radio'
              value={'true'}
              aria-checked={this.state.isPresentedBefore === true}
              checked={this.state.isPresentedBefore === true}
              onChange={() => this.setState({ isPresentedBefore: true })}
            />
            <label><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item2.button1'>
              예
            </IntlText></label>
            <input
              type='radio'
              value={'false'}
              aria-checked={this.state.isPresentedBefore === false}
              checked={this.state.isPresentedBefore === false}
              onChange={() => this.setState({ isPresentedBefore: false })}
            />
            <label><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item2.button2'>
              아니오
            </IntlText></label>
          </fieldset>
          <label><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item3'>
            발표한 행사
          </IntlText></label>
          <input
            type='text'
            value={this.state.placePresentedBefore}
            onChange={e => this.setState({ placePresentedBefore: e.target.value })}
          />
          <label><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item4'>
            발표 자료 링크
          </IntlText></label>
          <input
            type='text'
            value={this.state.presentedSlideUrlBefore}
            onChange={e => this.setState({ presentedSlideUrlBefore: e.target.value })}
          />
          <label><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item5.header'>
            참고 및 질문 사항
          </IntlText></label>
          <p><IntlText intlKey='contribute.talkProposal.application.stages.stages3.item5.desc1'>
            검토자에게 알리고 싶은 내용을 자유롭게 적어주세요.
          </IntlText></p>
          <input
            type='text'
            value={this.state.comment}
            onChange={e => this.setState({ comment: e.target.value })}
          />
          <StageButtonGroup
            onPrev={() => {
              stores.cfpStore.setCurrentStage(CFPFormStage.stage2)
            }}
            onSave={() => {
              stores.cfpStore.createOrUpdatePresentation(this.state).then(() => {
                alert('저장이 완료되었습니다')
              })
            }}
          />
        </form>
      </FormWrapper>
    )
  }
}
