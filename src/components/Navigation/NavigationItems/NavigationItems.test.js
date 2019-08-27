import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem' ;


configure({adapter: new Adapter()});

describe('<NavigationItems />',() =>{
    let wrapper =shallow(<NavigationItems />);
    beforeEach(() =>{

    })
    it('should render two <NavigationItems /> element if not authentificated',()=>{
        

        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    // it('should render three <NavigationItems /> element if authentificated',()=>{
    //     wrapper.setProps({isAuthentificated: true}) 
    //     expect(wrapper.find(NavigationItem)).toHaveLength(3);
    // });
});