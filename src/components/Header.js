import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse
} from 'mdb-react-ui-kit';

export default function Header() {
    const [showNavText, setShowNavText] = useState(false);

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand tag={Link} to='/'>
                    <img src="/images/logo-blog.png" alt="logo" style={{ height: "40px" }}></img>
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarText'
                    aria-controls='navbarText'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavText(!showNavText)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNavText}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <MDBNavbarLink active aria-current='page' tag={Link} to='/'>
                                Home
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink tag={Link} to='/addblog'>AddBlog</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink tag={Link} to='/about'>About</MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                  
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}