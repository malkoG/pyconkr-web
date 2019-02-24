import styled from '@emotion/styled'
import NavLink from 'components/atoms/NavLink'
import React from 'react'
import { contentWidth } from 'styles/layout'

const NavWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: ${contentWidth};
`

const NavItem = styled.li`
    display: inline-block;
    padding: 10px;
`

class Navigation extends React.Component {
    render () {
        return (
            <NavWrapper>
                <ul>
                    <NavItem>
                        <NavLink to='/sponsor' name='후원' />
                    </NavItem>
                    <NavItem>
                        <NavLink to='/contribute' name='공헌' />
                    </NavItem>
                </ul>
                <ul>
                    <NavItem>
                        <NavLink
                            to='https://github.com/login/oauth/authorize?client_id=bc6a4bddabaa55004090&scope=user:email'
                            name='로그인'
                        />
                    </NavItem>
                    <NavItem>
                        <button onClick={() => {}}>English</button>
                    </NavItem>
                </ul>
            </NavWrapper>
        )
    }
}

export default Navigation
