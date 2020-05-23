import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs, Actions } from 'react-native-router-flux';

//Splash Component
import Splash from '../components/Splash';

//Authentication Scenes
import Welcome from '../modules/Auth/scenes/Welcome';
import Register from '../modules/Auth/scenes/Register';
import CompleteProfile from '../modules/Auth/scenes/CompleteProfile';
import Login from '../modules/Auth/scenes/Login';
import ForgotPassword from '../modules/Auth/scenes/ForgotPassword';
import Home from '../modules/Home/scenes/Home';
import NewQuote from '../modules/Home/scenes/NewQuote';
import Profile from '../modules/Profile/scenes/Profile';
import Search from '../modules/Search/scenes/Search';

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../modules/Auth/actions";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color, navTitleStyle } from "../styles/theme";

import NavButton from '../components/NavButton';
import SaveButton from '../modules/Home/components/SaveButton';



// Simple component to render something in place of icon
const TabIcon = ({ focused, tintColor, title }) => {
    if (title === 'Home')
       {
         const iconName = `ios-home${focused ? '' : ''}`;
          return <Ionicons name={iconName} size={25} style={{color: focused ? '#4267B2' :'black'}} />;
       }
   else if (title === 'Search')
   {
     const iconName = `ios-search${focused ? '' : ''}`;
      return <Ionicons name={iconName} size={25} style={{color: focused ? '#4267B2' :'black'}} />;
   }
   else if (title === 'Profile')
   {
     const iconName = `ios-person${focused ? '' : ''}`;
      return <Ionicons name={iconName} size={25} style={{color: focused ? '#4267B2' :'black'}} />;
   }
        }

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false,
            exist: false //indicates if user exist in realtime database
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((exist, isLoggedIn) => {
            _this.setState({isReady: true, exist, isLoggedIn});
        }));
    }

    renderAddButton(props) {
      return (
          <NavButton onPress={Actions.NewQuote}
                     name={"plus"} type={"entypo"}
                     color={color.black}/>
      )
  }

  renderCloseButton(props) {
      return (
          <NavButton onPress={Actions.pop}
                     name={"md-close"}
                     type={"ionicon"}
                     color={color.black}/>
      )
  }

  renderSaveButton(props) {
      if (props.showButton) return (<SaveButton data={props.data}/>)
      else return null
  }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Scene key="root" hideNavBar
                       navigationBarStyle={{backgroundColor: "#fff"}}
                       titleStyle={navTitleStyle}
                       backButtonTintColor={color.black}>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register" back/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                    </Stack>

                   <Stack key="Main" initial={this.state.isLoggedIn}>
            <Scene
              hideNavBar
              tabBarPosition="bottom"
              key="tabbar"
              showLabel={false}
              animationEnabled={false}
              tabs={true}
              tabBarStyle={{ backgroundColor: "white" }}
            >
              {/* Tab and it's scenes */}
              <Scene key="Home" title="Home" hideNavBar icon={TabIcon}>
                <Stack key="root">
                  <Scene
                   Scene key="Home" component={Home} title="Home" initial={true} type={ActionConst.REPLACE}
                                   renderRightButton={this.renderAddButton}
                  />
                                   <Scene key="NewQuote"
                           navigationBarStyle={{backgroundColor: "#fff"}}
                           titleStyle={navTitleStyle}
                           component={NewQuote} title="New Post"
                           renderLeftButton={this.renderCloseButton}
                           renderRightButton={this.renderSaveButton}/>
                </Stack>
              </Scene>

              <Scene key="Search" title="Search" icon={TabIcon}>
                <Stack key="root">
                  <Scene
                    key="Search"
                    hideNavBar
                    component={Search}
                    type={ActionConst.REPLACE}
                    title="Search"
                  />
                </Stack>
              </Scene>

              <Scene key="Profile" title="Profile" icon={TabIcon}>
                <Stack key="root">
                  <Scene
                    key="Profile"
                    hideNavBar
                    component={Profile}
                    type={ActionConst.REPLACE}
                    title="Profile"
                  />
                </Stack>
              </Scene>
            </Scene>
          </Stack>
                </Scene>
            </Router>
        )
    }
}