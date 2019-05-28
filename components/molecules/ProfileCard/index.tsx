import styled from '@emotion/styled'
import * as React from 'react'

type PropsType = {
  profileImg: string;
  name: string;
  organization: string;
  bio: string;
}

const ProfileCardWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 40px;
`

const ProfileImage = styled.div`
  width: 20%;
  text-align: center;

  img {
    width: 100px;
    border-radius: 50%;
    box-shadow: 0px 0px 20px #DFDFDF
  }
`

const ProfileDescription = styled.div`
  width: 80%;
  padding: 25px;
  box-shadow: 0px 0px 20px #DFDFDF;
  border-radius: 5px;
  color: #077477;

  pre {
    white-space: pre-wrap;
    color: #4a4a4a;
    line-height: 1.4em;
  }
`

const ProfileName = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 20px;
`

const ProfileOrganization = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  opacity: 0.8;
`

class ProfileCard extends React.Component<PropsType> {
  render() {
    const { profileImg, name, organization, bio } = this.props

    return (
      <ProfileCardWrapper>
        <ProfileImage>
          <img src={profileImg} />
        </ProfileImage>
        <ProfileDescription>
          <ProfileName>{name}</ProfileName>
          <ProfileOrganization>{organization}</ProfileOrganization>
          <pre>{bio}</pre>
        </ProfileDescription>
      </ProfileCardWrapper>
    )
  }
}

export default ProfileCard
