import { FormWrapper, SelectWrapper } from 'components/atoms/ContentWrappers'
import { IntlText } from 'components/atoms/IntlText'
import { StageButtonGroup } from 'components/organisms/CFPForm/StageButtonGroup'
import { SponsorFormStage } from 'lib/stores/Sponsor/SponsorStore'
import { inject, observer } from 'mobx-react'
import { StoresType } from 'pages/_app'
import React from 'react'
import intl from 'react-intl-universal'
import styled from "@emotion/styled";
import { FORM_LABEL_GRAY } from "../../../styles/colors";
import { mobileWidth } from "../../../styles/layout";
import { toJS } from "mobx"
import { DEFAULT_TEXT_BLACK } from 'styles/colors'

const FormHalfBox = styled.div`
display: inline-block;
margin-right: 5%;
width: 45%;
@media (max-width: ${mobileWidth}) {
  display: block;
  width: 100%;
  margin: 0;
}
}`

const SectionTitle = styled.div`
margin-top: 20px;
}`

const InputDesc = styled.div`
color: ${FORM_LABEL_GRAY};
font-size: 12px;
line-height: 1.8;
margin-bottom: 5px;
}`

@inject('stores')
@observer
export default class CFPFormStage2 extends React.Component<{ stores: StoresType; scrollRef: HTMLDivElement }> {

  componentDidMount() {
    const { scrollRef } = this.props 
    scrollRef && window.scrollTo(0, scrollRef.offsetTop)
  }

  render() {
    const { stores } = this.props
    const { profileStore, sponsorStore } = stores
    const { profile } = toJS(profileStore)
    const { proposal } = sponsorStore
    return (
        <FormWrapper>
          <form onSubmit={(e) => {
            e.preventDefault()
            sponsorStore.createOrUpdateSponsor(proposal).then(() => {
              sponsorStore.setCurrentStage(SponsorFormStage.stage3)
            })
          }}>
            <FormHalfBox>
              <label className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                  후원사 이름(영문)
                </IntlText>
              </label>
              <input
                type='text'
                value={(proposal.nameEn as string) || ''}
                onChange={e => proposal.setNameEng(e.target.value)}
                aria-required={true}
                required
              />
            </FormHalfBox>
            <FormHalfBox>
                <label className='required'>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                    후원사 이름(국문)
                  </IntlText>
                </label>
                <input
                  type='text'
                  value={(proposal.nameKo as string) || ''}
                  onChange={e => proposal.setNameKor(e.target.value)}
                  aria-required={true}
                  required
                />
            </FormHalfBox>
            <SectionTitle>연락 정보</SectionTitle>
            <hr className='margin-20' />
            <label className='required'>
              <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                담당자 파이콘 계정 이메일
              </IntlText>
            </label>
            <input
              type='text'
              value={profile.email}
              disabled
            />

            <FormHalfBox>
              <label className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                  담당자 이름
                </IntlText>
              </label>
              <input
                type='text'
                value={proposal.managerName}
                onChange={e => proposal.setManagerName(e.target.value)}
                aria-required={true}
                required
              />
            </FormHalfBox>

            <FormHalfBox>
              <label className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                  담당자 연락처
                </IntlText>
              </label>
              <input
                type='text'
                value={proposal.managerPhone}
                onChange={e => proposal.setManagerPhone(e.target.value)}
                aria-required={true}
                required
              />
            </FormHalfBox>

            <FormHalfBox>
              <label className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                  업무용 공식 이메일
                </IntlText>
              </label>
              <input
                type='text'
                value={proposal.managerEmail}
                onChange={e => proposal.setManagerEmail(e.target.value)}
                aria-required={true}
                required
              />
            </FormHalfBox>

            <FormHalfBox>
              <label className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                  보조 연락처
                </IntlText>
              </label>
              <input
                type='text'
                value={proposal.managerSecondaryPhone}
                onChange={e => proposal.setManagerSecondaryPhone(e.target.value)}
                aria-required={true}
                required
              />
            </FormHalfBox>
            <SectionTitle>후원 정보</SectionTitle>
              <hr className='margin-20' />

              <label className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item2'>
                  후원 등급
                </IntlText>
              </label>
              {/* <SelectWrapper>
                <select
                  value={proposal.level}
                  onBlur={e => this.setState({ levelId: e.target.value })}
                  onChange={e => this.setState({ levelId: e.target.value })}
                  aria-required={true}
                  required
                >
                  {
                    sponsorStore.sponsorLevels.map(level =>
                      <option
                        key={level.id}
                        aria-selected={proposal.level === 'level.id'}
                        value={level.id}
                      >{level.name}</option>
                    )
                  }
                </select>
              </SelectWrapper> */}

              <FormHalfBox>
                <label className='required'>
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                    사업자 등록번호
                  </IntlText>
                </label>
                <input
                  type='text'
                  value={proposal.businessRegistrationNumber}
                  onChange={e => proposal.setBusinessRegistrationNumber(e.target.value)}
                  aria-required={true}
                  required
                />
              </FormHalfBox>

              <FormHalfBox>
                <label 
                  htmlFor='business_upload'
                  className='required'
                  >
                  <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                    사업자 등록증
                  </IntlText>
                </label>
                <input
                  id='business_upload'
                  name='business-registration-file-upload'
                  type='file'
                  onChange={({ target: { validity, files } }) => {
                    if (!validity.valid || !files) {
                      return
                    }
                    sponsorStore.uploadBusinessRegistrationFile(files[0])
                  }}
                  aria-required={true}
                  required
                />
              </FormHalfBox>

              <div role='group'>
                <fieldset className='full'>
                  <label className='required'>
                    <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.header'>
                      회사에서 준비한 별도의 계약 과정이 필요한가요?
                    </IntlText>
                  </label>
                  <p>
                    <input
                      type='radio'
                      id='contractProcessRequiredTrue'
                      value='true'
                      aria-checked={proposal.contractProcessRequired}
                      checked={proposal.contractProcessRequired}
                      onChange={() => proposal.setContractProcessRequired(true)}
                    />
                    <label htmlFor='contractProcessRequiredTrue'>
                      <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.sub1'>
                        예
                      </IntlText>
                    </label>
                  </p>
                  <p>
                    <input
                      type='radio'
                      id='contractProcessRequiredFalse'
                      value='false'
                      aria-checked={!proposal.contractProcessRequired}
                      checked={!proposal.contractProcessRequired}
                      onChange={() => proposal.setContractProcessRequired(false)}
                    />
                    <label htmlFor='contractProcessRequiredFalse'>
                      <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item5.sub2'>
                        아니오
                      </IntlText>
                    </label>
                    <InputDesc>
                      별도의 계약 과정이 필요한 경우, 담당자가 메일로 안내드립니다.<br />
                      계약 과정이 아닌 패키지 선택 등의 다른 사항은 후원사 신청 이전에 메일로 문의해주세요.<br />
                      sponsor@pycon.kr
                    </InputDesc>
                  </p>
                </fieldset>
              </div>

              <SectionTitle>후원사 소개 정보</SectionTitle>
              <hr className='margin-20' />

              <label className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                  후원사 또는 서비스 웹사이트
                </IntlText>
              </label>
              <input
                type='text'
                value={proposal.url || ''}
                onChange={e => proposal.setUrl(e.target.value)}
                aria-required={true}
                required
              />

              <label className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                  후원사 로고
                </IntlText>
              </label>
              <input
                type='file'
                aria-required={true}
                required
              />

              <label className='required'>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                  후원사 로고(Vector)
                </IntlText>
              </label>
              <input
                type='file'
                value={proposal.name}
                onChange={e => this.setState({ name: e.target.value })}
                aria-required={true}
                required
              />

              <label>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                  후원사 소개(국문)
                </IntlText>
              </label>
              <InputDesc>
                파이콘 홈페이지 후원사 상세페이지에 기재될 내용입니다.<br/>
                추후 추가 또는 수정 가능합니다.
              </InputDesc>
              <textarea
                value={proposal.descKo}
                onChange={e => proposal.setDescKo(e.target.value)}
                aria-required={true}
                style={{ height: 400, marginBottom: 5 }}
                required
              />
              <span style={{
                display: 'block',
                marginBottom: 40,
                textAlign: 'right',
                fontSize: 14,
                color: proposal.descKo.length >= 5000 ? 'red' : DEFAULT_TEXT_BLACK
              }}>{proposal.descKo.length} / 5000(최대)</span>
              <label>
                <IntlText intlKey='contribute.talkProposal.application.stages.stages2.item1'>
                  후원사 소개(영문)
                </IntlText>
              </label>
              <InputDesc>
                파이콘 홈페이지 후원사 상세페이지에 기재될 내용입니다.<br/>
                추후 추가 또는 수정 가능합니다.
              </InputDesc>
              <textarea
                value={proposal.descEn}
                onChange={e => proposal.setDescEn(e.target.value)}
                aria-required={true}
                style={{ height: 400, marginBottom: 5 }}
                required
              />
              <span style={{
                display: 'block',
                marginBottom: 40,
                textAlign: 'right',
                fontSize: 14,
                color: proposal.descEn.length >= 5000 ? 'red' : DEFAULT_TEXT_BLACK
              }}>{proposal.descEn.length} / 5000(최대)</span>

              <StageButtonGroup />
          </form>
        </FormWrapper>
    )
  }
}
