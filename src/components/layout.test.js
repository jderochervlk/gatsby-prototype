import { shallow } from 'enzyme'
import React from 'react'

import Layout from './layout'

describe('layout', () => {
    it('should render as expected', () => {
        const layout = shallow(<Layout><p>Hello!</p></Layout>)
        expect(layout).toMatchSnapshot()
    })
})