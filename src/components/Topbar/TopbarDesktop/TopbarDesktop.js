import React, { useState, useEffect } from 'react';
import { bool, func, object, number, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import {
  Avatar,
  InlineTextButton,
  Logo,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
  ListingLink,
  OwnListingLink,
} from '../../../components';


import css from './TopbarDesktop.module.css';
import Drawer from 'react-modern-drawer';
import '../../../styles/react-modern-drawer.css'
import './drawer.css';
import hairSaloon from '../../../assets/deal1.png';
import cartImg from '../../../assets/businessImg2.png';
import { OutsideClickHandler } from '../../../components';
import { ACCOUNT_SETTINGS_PAGES } from '../../../routing/routeConfiguration';
import { propTypes } from '../../../util/types';
import TopbarSearchForm from '../TopbarSearchForm/TopbarSearchForm';
import IconNotification from '../../IconNotification/IconNotification';
import IconDashboard from '../../IconDashboard/IconDashboard';
import AuthenticationPage from '../../../containers/AuthenticationPage/AuthenticationPage';
import IconRightArrow from '../../IconRightArrow/IconRightArrow';
import IconProfile from '../../IconProfile/IconProfile';
import IconOrder from '../../IconOrder/IconOrder';
import IconMessages from '../../IconMessages/IconMessages';
import IconLogout from '../../IconLogout/IconLogout';
import IconBag from '../../IconBag/IconBag';
import IconBin from '../../IconBin/IconBin';
import IconCollection from '../../IconCollection/IconCollection';
import { intlShape } from '../../../util/reactIntl';
import IconUser from '../../IconUser/IconUser';
import IconMessage from '../../IconMessage/IconMessage';
const TopbarDesktop = props => {
  const {
    className,
    currentUser,
    currentPage,
    rootClassName,
    currentUserHasListings,
    currentUserListing,
    currentUserListingFetched,
    notificationCount,
    intl,
    isAuthenticated,
    onLogout,
    onSearchSubmit,
    initialSearchFormValues,
    submitLogin,
    submitPasswordRecovery,
    submitSignup,
    authInProgress,
  } = props;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Drawer
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    // setIsOpen(true);
    setIsOpen(prevState => !prevState);
  };

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const authenticatedOnClientSide = mounted && isAuthenticated;
  const isAuthenticatedOrJustHydrated = isAuthenticated || !mounted;

  const classes = classNames(rootClassName || css.root, className);

  const search = (
    <TopbarSearchForm
      className={css.searchLink}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
    />
  );

  const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

  const inboxLink = authenticatedOnClientSide ? (
    <NamedLink
      className={css.createListingLink}
      name="InboxPage"
      params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
    >
      <span className={css.inbox}>
        <FormattedMessage id="TopbarDesktop.inbox" />
        {notificationDot}
      </span>
    </NamedLink>
  ) : null;

  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };

  const profileMenu = (
    <Menu>
      <MenuLabel className={css.profileMenuLabel} isOpenClassName={css.profileMenuIsOpen}>
        {/* <Avatar className={css.avatar} user={currentUser} disableProfileLink /> */}
        <IconUser user={currentUser} disableProfileLink />
      </MenuLabel>
      <MenuContent className={css.profileMenuContent}>
        <MenuItem key="Profile">
          <div className={css.currentUserDetails}>
            <h2>John deo</h2>
          </div>
        </MenuItem>
        <MenuItem key="Dashboard">
          <NamedLink className={css.dropdownLink} name="ProfileSettingsPage">
            <IconDashboard /> Dashboard
          </NamedLink>
        </MenuItem>
        <MenuItem key="My Profile">
          <NamedLink className={css.dropdownLink} name="ProfileSettingsPage">
            <IconProfile /> My Profile
          </NamedLink>
        </MenuItem>
        <MenuItem key="Order">
          <NamedLink className={css.dropdownLink} name="ProfileSettingsPage">
            <IconOrder />
            Order
          </NamedLink>
        </MenuItem>
        <MenuItem key="Message">
          <NamedLink className={css.dropdownLink} name="ProfileSettingsPage">
            <IconMessages />
            Message
          </NamedLink>
        </MenuItem>
        <MenuItem key="logout">
          <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
            <IconLogout />
            <FormattedMessage id="TopbarDesktop.logout" />
          </InlineTextButton>
        </MenuItem>
        {/* <MenuItem key="EditListingPage">
          <OwnListingLink
            listing={currentUserListing}
            listingFetched={currentUserListingFetched}
            className={css.yourListingsLink}
          >
            <div>
              {currentUserListing ? (
                <FormattedMessage id="TopbarDesktop.editYourListingLink" />
              ) : (
                <FormattedMessage id="TopbarDesktop.addYourListingLink" />
              )}
            </div>
          </OwnListingLink>
        </MenuItem>
        <MenuItem key="ProfileSettingsPage">
          <NamedLink
            className={classNames(css.profileSettingsLink, currentPageClass('ProfileSettingsPage'))}
            name="ProfileSettingsPage"
          >
            <FormattedMessage id="TopbarDesktop.profileSettingsLink" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="AccountSettingsPage">
          <NamedLink
            className={classNames(css.yourListingsLink, currentPageClass('AccountSettingsPage'))}
            name="AccountSettingsPage"
          >
            <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
          </NamedLink>
        </MenuItem> */}
      </MenuContent>
    </Menu>
  );
  const cart = !authenticatedOnClientSide ? (
    <Menu className={css.menuDropdown}>
      <MenuLabel className={css.profileMenuLabel} isOpenClassName={css.profileMenuIsOpen}>
        <IconBag />
      </MenuLabel>
      <MenuContent className={css.cartMenuContent}>
        <MenuItem key="Cart">
          <div className={css.currentUserDetails}>
            <h2>Cart (2) </h2>
          </div>
        </MenuItem>
        <MenuItem key="Profile1">
          <NamedLink className={css.dropdownLink} name="ProfileSettingsPage">
            <div className={css.cartItem}>
              <div className={css.cartItemImg}>
                <img src={cartImg} alt="cart image" />
              </div>
              <div className={css.cartItemInfo}>
                <div className={css.serviceDetails}>
                  <div className={css.serviceTime}>
                    <h2>Haircut - Women</h2>
                    <p>
                      <span className={css.time}>45 m</span>{' '}
                      <span className={css.date}>7.30 pm,Mon 30 July </span>
                    </p>
                  </div>
                  <div className={css.servicePrice}>$50</div>
                </div>
                <div className={css.serviceAddress}>
                  <div className={css.serviceAddressLeft}>
                    <h2>Strands Salon</h2>
                    <p>
                      <span className={css.time}>102,Example Street,New Delhi</span>
                    </p>
                  </div>
                  <div className={css.serviceAddressRight}>
                    <IconBin />
                  </div>
                </div>
              </div>
            </div>
          </NamedLink>
        </MenuItem>
        <MenuItem key="Profile2">
          <NamedLink className={css.dropdownLink} name="ProfileSettingsPage">
            <div className={css.cartItem}>
              <div className={css.cartItemImg}>
                <img src={cartImg} alt="cart image" />
              </div>
              <div className={css.cartItemInfo}>
                <div className={css.serviceDetails}>
                  <div className={css.serviceTime}>
                    <h2>Haircut - Women</h2>
                    <p>
                      <span className={css.time}>45 m</span>{' '}
                      <span className={css.date}>7.30 pm,Mon 30 July </span>
                    </p>
                  </div>
                  <div className={css.servicePrice}>$50</div>
                </div>
                <div className={css.serviceAddress}>
                  <div className={css.serviceAddressLeft}>
                    <h2>Strands Salon</h2>
                    <p>
                      <span className={css.time}>102,Example Street,New Delhi</span>
                    </p>
                  </div>
                  <div className={css.serviceAddressRight}>
                    <IconBin />
                  </div>
                </div>
              </div>
            </div>
          </NamedLink>
        </MenuItem>
        <MenuItem key="Profile3">
          <NamedLink className={css.dropdownLink} name="ProfileSettingsPage">
            <div className={css.cartItem}>
              <div className={css.cartItemImg}>
                <img src={cartImg} alt="cart image" />
              </div>
              <div className={css.cartItemInfo}>
                <div className={css.serviceDetails}>
                  <div className={css.serviceTime}>
                    <h2>Haircut - Women</h2>
                    <p>
                      <span className={css.time}>45 m</span>{' '}
                      <span className={css.date}>7.30 pm,Mon 30 July </span>
                    </p>
                  </div>
                  <div className={css.servicePrice}>$50</div>
                </div>
                <div className={css.serviceAddress}>
                  <div className={css.serviceAddressLeft}>
                    <h2>Strands Salon</h2>
                    <p>
                      <span className={css.time}>102,Example Street,New Delhi</span>
                    </p>
                  </div>
                  <div className={css.serviceAddressRight}>
                    <IconBin />
                  </div>
                </div>
              </div>
            </div>
          </NamedLink>
        </MenuItem>
        <MenuItem key="Profile4">
          <NamedLink className={css.dropdownLink} name="ProfileSettingsPage">
            <div className={css.cartItem}>
              <div className={css.cartItemImg}>
                <img src={cartImg} alt="cart image" />
              </div>
              <div className={css.cartItemInfo}>
                <div className={css.serviceDetails}>
                  <div className={css.serviceTime}>
                    <h2>Haircut - Women</h2>
                    <p>
                      <span className={css.time}>45 m</span>{' '}
                      <span className={css.date}>7.30 pm,Mon 30 July </span>
                    </p>
                  </div>
                  <div className={css.servicePrice}>$50</div>
                </div>
                <div className={css.serviceAddress}>
                  <div className={css.serviceAddressLeft}>
                    <h2>Strands Salon</h2>
                    <p>
                      <span className={css.time}>102,Example Street,New Delhi</span>
                    </p>
                  </div>
                  <div className={css.serviceAddressRight}>
                    <IconBin />
                  </div>
                </div>
              </div>
            </div>
          </NamedLink>
        </MenuItem>
        <MenuItem key="Profile5">
          <NamedLink className={css.dropdownLink} name="ProfileSettingsPage">
            <div className={css.cartItem}>
              <div className={css.cartItemImg}>
                <img src={cartImg} alt="cart image" />
              </div>
              <div className={css.cartItemInfo}>
                <div className={css.serviceDetails}>
                  <div className={css.serviceTime}>
                    <h2>Haircut - Women</h2>
                    <p>
                      <span className={css.time}>45 m</span>{' '}
                      <span className={css.date}>7.30 pm,Mon 30 July </span>
                    </p>
                  </div>
                  <div className={css.servicePrice}>$50</div>
                </div>
                <div className={css.serviceAddress}>
                  <div className={css.serviceAddressLeft}>
                    <h2>Strands Salon</h2>
                    <p>
                      <span className={css.time}>102,Example Street,New Delhi</span>
                    </p>
                  </div>
                  <div className={css.serviceAddressRight}>
                    <IconBin />
                  </div>
                </div>
              </div>
            </div>
          </NamedLink>
        </MenuItem>
        <MenuItem key="Profile6">
          <NamedLink className={css.dropdownLink} name="ProfileSettingsPage">
            <div className={css.cartItem}>
              <div className={css.cartItemImg}>
                <img src={cartImg} alt="cart image" />
              </div>
              <div className={css.cartItemInfo}>
                <div className={css.serviceDetails}>
                  <div className={css.serviceTime}>
                    <h2>Haircut - Women</h2>
                    <p>
                      <span className={css.time}>45 m</span>{' '}
                      <span className={css.date}>7.30 pm,Mon 30 July </span>
                    </p>
                  </div>
                  <div className={css.servicePrice}>$50</div>
                </div>
                <div className={css.serviceAddress}>
                  <div className={css.serviceAddressLeft}>
                    <h2>Strands Salon</h2>
                    <p>
                      <span className={css.time}>102,Example Street,New Delhi</span>
                    </p>
                  </div>
                  <div className={css.serviceAddressRight}>
                    <IconBin />
                  </div>
                </div>
              </div>
            </div>
          </NamedLink>
        </MenuItem>
        <MenuItem key="Profile7">
          <div className={css.totalPay}>
            <div className={css.leftSec}>
              <h2>Total Pay</h2>
              <h2>$180</h2>
            </div>
            <div className={css.rightSec}>
              <button className={css.blueBtn}>Proceed</button>
            </div>
          </div>
        </MenuItem>
      </MenuContent>
    </Menu>
  ) : null;

  const signupLink = isAuthenticatedOrJustHydrated ? null : (
    <NamedLink name="SignupPage" className={css.signupLink}>
      <FormattedMessage id="TopbarDesktop.signup" />
    </NamedLink>
  );

  const loginLink = isAuthenticatedOrJustHydrated ? null : (
    // <NamedLink name="LoginPage" className={css.loginLink} onClick={toggleDrawer} >
    <span onClick={toggleDrawer} className={css.loginLink}>
      <FormattedMessage id="TopbarDesktop.login" />
    </span>
    // </NamedLink>
    // <span onClick={toggleDrawer} className={css.loginLink}>
    //   <FormattedMessage id="TopbarDesktop.login" />
    // </span>
  );

  const listingLink =
    authenticatedOnClientSide && currentUserListingFetched && currentUserListing ? (
      <ListingLink
        className={css.createListingLink}
        listing={currentUserListing}
        children={<FormattedMessage id="TopbarDesktop.viewListing" />}
      />
    ) : null;

  const createListingLink =
    isAuthenticatedOrJustHydrated && !(currentUserListingFetched && !currentUserListing) ? null : (
      <NamedLink className={css.createListingLink} name="NewListingPage">
        <FormattedMessage id="TopbarDesktop.createListing" />
      </NamedLink>
    );
  const [activeId, setActiveId] = useState(0);

  const values = [
    {
      id: 1,
      tabTitle: 'Hair',
      linkName: 'HairPage',
    },
    {
      id: 2,
      tabTitle: 'Men',
      linkName: 'MensPage',
    },
    {
      id: 3,
      tabTitle: 'Beauty',
      linkName: 'BeautyPage',
    },
    {
      id: 4,
      tabTitle: 'Wellness',
      linkName: 'WellnessPage',
    },
    {
      id: 5,
      tabTitle: 'Treatments',
      linkName: 'TreatmentsPage',
    },
    {
      id: 6,
      tabTitle: 'Blog',
      linkName: 'BlogPage',
    },
  ];
  function onSelect({ key }) {
    console.log(`${key} selected`);
  }

  function onVisibleChange(visible) {
    console.log(visible);
  }
  const customStyle = {
    width: '100%',
    display: 'initial',
  };

  return (
    <>
      <nav className={classes}>
        <div className={classNames(css.fixedWidthHeader, activeId && css.headerBorder)}>
       <div className={classNames(css.headerContainer)}>
       <NamedLink className={css.logoLink} name="LandingPage">
        <IconCollection name="TOPBAR_LOGO"/>
          </NamedLink>
          <div className={css.centerNav}>
            {values.map(val => (
              <a
                key={val.id}
                href="#"
                onClick={() => setActiveId(val.id)}
                className={classNames(
                  css.createListingLink,
                  activeId === val.id ? css.active : null
                )}
              >
                <span>{val.tabTitle}</span>
              </a>
            ))}

   <div className={css.topSearch}>
                  <span
                    className={css.searchIcon}
                    onClick={() => setShowSearch(!showSearch)}
                  >
                   <IconCollection name="SEARCH_ICON"/>
                  </span>
                  {showSearch && <input type="text" placeholder="Search" />}
                </div>
          </div>
          <div className={css.loginWrapper}>
          {!authenticatedOnClientSide ? loginLink : profileMenu}
            {/* {listingLink} */}
            {inboxLink}
            <span className={css.messages}>
              <IconMessage /> <span className={css.badge}>2</span>
            </span>
            <IconNotification />
    
           {authenticatedOnClientSide? null : <div className={css.divider}>&nbsp;</div>}
            {cart}
            {/* {profileMenu} */}
          </div>
       </div>
        </div>

        {/* mega menu */}
        <OutsideClickHandler onOutsideClick={() => setActiveId(0)} customStyle={customStyle}>
          <div className={classNames(css.megaMenuContainer,  activeId === 1 ||
                activeId === 2 ||
                activeId === 3 ||
                activeId === 4 ||
                activeId === 5 ||
                activeId === 6 ||
                activeId === 7
                  ? css.borderTop
                  : null)}>
            <div className={css.fixedWidthContainer}>
              {activeId === 1 && (
                <>
                  <div className={css.megaMenuContent}>
                    <div className={css.megaMenuLeft}>
                      <h2>Services</h2>
                      <ul className={css.menuLinks}>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Hairdressers
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink
                            className={css.menuLink}
                            name="SearchPage"
                            to={{ search: 'Dreadlocks' }}
                            // search: `pub_categoryId=${cat.key}`,
                          >
                            Dreadlocks
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Braids
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Installs / Sew In / Wigs
                          </NamedLink>
                        </li>
                      </ul>
                    </div>
                    <div className={css.megaMenuRight}>
                      <div className={css.exploreCategories}>
                        <div className={css.exploreWrapper}>
                          <h2>Explore Hair Salons</h2>
                          <div className={css.exploreBlock}>
                            <div className={classNames(css.borderDiv, css.blackBorder)}>
                              <div className={css.exploreImg}>
                                <img src={hairSaloon} alt="Hair saloon" />
                              </div>
                            </div>
                            <div className={css.exploreInfo}>
                              <p>Find more than 2000 + hair salons</p>
                              <a href="#" className={css.exploreNow}>
                                Explore now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={css.viewAll}>
                    <a href="#" className={css.seeMore}>
                      See all Hair <IconRightArrow />
                    </a>
                  </div>
                </>
              )}
              {activeId === 2 && (
                <>
                  <div className={css.megaMenuContent}>
                    <div className={css.megaMenuLeft}>
                   <h2>Services</h2>
                      <ul className={css.menuLinks}>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Barber
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Grooming
                          </NamedLink>
                        </li>
                      </ul>
                    </div>
                    <div className={css.megaMenuRight}>
                      <div className={css.exploreCategories}>
                        <div className={css.exploreWrapper}>
                          <h2>Explore Barbers</h2>
                          <div className={css.exploreBlock}>
                            <div className={classNames(css.borderDiv, css.brownBorder)}>
                              <div className={css.exploreImg}>
                                <img src={hairSaloon} alt="Hair saloon" />
                              </div>
                            </div>
                            <div className={css.exploreInfo}>
                              <p>Find more than 2000 + hair salons</p>
                              <a href="#" className={css.exploreNow}>
                                Explore now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={css.viewAll}>
                    <a href="#" className={css.seeMore}>
                      See all Men <IconRightArrow />
                    </a>
                  </div>
                </>
              )}
              {activeId === 3 && (
                <>
                  <div className={css.megaMenuContent}>
                    <div className={css.megaMenuLeft}>
                      <h2>Services</h2>
                      <ul className={css.menuLinks}>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Eyelashes
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Eyebrows
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Facials
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Nails
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Makeup
                          </NamedLink>
                        </li>
                      </ul>
                    </div>
                    <div className={css.megaMenuRight}>
                      <div className={css.exploreCategories}>
                        <div className={css.exploreWrapper}>
                          <h2>Explore Beauty Salons</h2>
                          <div className={css.exploreBlock}>
                            <div className={classNames(css.borderDiv, css.pinkBorder)}>
                              <div className={css.exploreImg}>
                                <img src={hairSaloon} alt="Hair saloon" />
                              </div>
                            </div>
                            <div className={css.exploreInfo}>
                              <p>Lorem Ipsum is simply dummy text of the </p>
                              <a href="#" className={css.exploreNow}>
                                Explore now
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className={css.exploreWrapper}>
                          <h2>Beauty Articles</h2>
                          <div className={css.exploreBlock}>
                            <div className={classNames(css.borderDiv, css.brownBorder)}>
                              <div className={css.exploreImg}>
                                <img src={hairSaloon} alt="Hair saloon" />
                              </div>
                            </div>
                            <div className={css.exploreInfo}>
                              <p>Lorem Ipsum is simply dummy text of the </p>
                              <a href="#" className={css.exploreNow}>
                                Explore now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={css.viewAll}>
                    <a href="#" className={css.seeMore}>
                      See all Beauty Salons <IconRightArrow />
                    </a>
                  </div>
                </>
              )}
              {activeId === 4 && (
                <>
                  <div className={css.megaMenuContent}>
                    <div className={css.megaMenuLeft}>
                      <h2>Services</h2>
                      <ul className={css.menuLinks}>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Fitness
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Massage
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Therapy / Mental Health
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Nutrition
                          </NamedLink>
                        </li>
                      </ul>
                    </div>
                    <div className={css.megaMenuRight}>
                      <div className={css.exploreCategories}>
                        <div className={css.exploreWrapper}>
                          <h2>Explore Clinics</h2>
                          <div className={css.exploreBlock}>
                            <div className={classNames(css.borderDiv, css.pinkBorder)}>
                              <div className={css.exploreImg}>
                                <img src={hairSaloon} alt="Hair saloon" />
                              </div>
                            </div>
                            <div className={css.exploreInfo}>
                              <p>Lorem Ipsum is simply dummy text of the </p>
                              <a href="#" className={css.exploreNow}>
                                Explore now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={css.viewAll}>
                    <a href="#" className={css.seeMore}>
                      See all Wellness Centres <IconRightArrow />
                    </a>
                  </div>
                </>
              )}
              {activeId === 5 && (
                <>
                  <div className={css.megaMenuContent}>
                    <div className={css.megaMenuLeft}>
                      <h2>Services</h2>
                      <ul className={css.menuLinks}>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Laser Clinics
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Facials
                          </NamedLink>
                        </li>
                      </ul>
                    </div>
                    <div className={css.megaMenuRight}>
                      <div className={css.exploreCategories}>
                        <div className={css.exploreWrapper}>
                          <h2>Explore Treatments</h2>
                          <div className={css.exploreBlock}>
                            <div className={classNames(css.borderDiv, css.brownBorder)}>
                              <div className={css.exploreImg}>
                                <img src={hairSaloon} alt="Hair saloon" />
                              </div>
                            </div>
                            <div className={css.exploreInfo}>
                              <p>Lorem Ipsum is simply dummy text of the </p>
                              <a href="#" className={css.exploreNow}>
                                Explore now
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className={css.exploreWrapper}>
                          <h2>Treatment Articles</h2>
                          <div className={css.exploreBlock}>
                            <div className={classNames(css.borderDiv, css.blueBorder)}>
                              <div className={css.exploreImg}>
                                <img src={hairSaloon} alt="Hair saloon" />
                              </div>
                            </div>
                            <div className={css.exploreInfo}>
                              <p>Lorem Ipsum is simply dummy text of the </p>
                              <a href="#" className={css.exploreNow}>
                                Explore now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={css.viewAll}>
                    <a href="#" className={css.seeMore}>
                      See all Treatments <IconRightArrow />
                    </a>
                  </div>
                </>
              )}
              {activeId === 6 && (
                <>
                  <div className={css.megaMenuContent}>
                    <div className={css.megaMenuLeft}>
                      <h2>Topics</h2>
                      <ul className={css.menuLinks}>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Mens
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Hair
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Beauty
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Wellness
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Treatments
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Guides
                          </NamedLink>
                        </li>
                        <li>
                          <NamedLink className={css.menuLink} name="SearchPage">
                            Food
                          </NamedLink>
                        </li>
                      </ul>
                    </div>
                    <div className={css.megaMenuRight}>
                      <div className={css.exploreCategories}>
                        <div className={css.exploreWrapper}>
                          <h2>Latest Articles</h2>
                          <div className={css.exploreBlock}>
                            <div className={classNames(css.borderDiv, css.brownBorder)}>
                              <div className={css.exploreImg}>
                                <img src={hairSaloon} alt="Hair saloon" />
                              </div>
                            </div>
                            <div className={css.exploreInfo}>
                              <p>Lorem Ipsum is simply dummy text of the </p>
                              <a href="#" className={css.exploreNow}>
                                Read now
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className={css.exploreWrapper}>
                          <h2>Mens Articles</h2>
                          <div className={css.exploreBlock}>
                            <div className={classNames(css.borderDiv, css.pinkBorder)}>
                              <div className={css.exploreImg}>
                                <img src={hairSaloon} alt="Hair saloon" />
                              </div>
                            </div>
                            <div className={css.exploreInfo}>
                              <p>Lorem Ipsum is simply dummy text of the </p>
                              <a href="#" className={css.exploreNow}>
                                Read now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={css.viewAll}>
                    <a href="#" className={css.seeMore}>
                      See All Articles <IconRightArrow />
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </OutsideClickHandler>
      </nav>

      <Drawer
        open={isAuthenticated ? false : isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
      >
        <AuthenticationPage
          onDrawerClose={toggleDrawer}
          onClick={toggleDrawer}
          step={step}
          setStep={setStep}
        />
      </Drawer>
    </>
  );
};

TopbarDesktop.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  currentPage: null,
  notificationCount: 0,
  initialSearchFormValues: {},
  currentUserListing: null,
  currentUserListingFetched: false,
};

TopbarDesktop.propTypes = {
  rootClassName: string,
  className: string,
  currentUserHasListings: bool.isRequired,
  currentUserListing: propTypes.ownListing,
  currentUserListingFetched: bool,
  currentUser: propTypes.currentUser,
  currentPage: string,
  isAuthenticated: bool.isRequired,
  onLogout: func.isRequired,
  notificationCount: number,
  onSearchSubmit: func.isRequired,
  initialSearchFormValues: object,
  intl: intlShape.isRequired,
};

export default TopbarDesktop;
