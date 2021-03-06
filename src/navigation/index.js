import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { WelcomeScreen, ForgotScreen, LoginScreen, RegisterScreen, InventoryEditorScreen, LoadingScreen, InventoryListScreen, InventoryDetailsScreen, ContactsScreen, RecipesScreen, RecipesDetailsScreen, SettingsScreen } from '../containers';
import theme from '../theme'
import { DrawerComponent } from '../components';
import { Easing, Animated } from 'react-native'


const RootStack = createStackNavigator({
    WelcomeScreen: { screen: WelcomeScreen },
    ForgotScreen: { screen: ForgotScreen },
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    main: { screen: InventoryListScreen },
    InventoryEditorScreen: { screen: InventoryEditorScreen },
    InventoryDetailsScreen: { screen: InventoryDetailsScreen },
    ContactsScreen:{screen:ContactsScreen},
    RecipesScreen: {screen:RecipesScreen},
    RecipesDetailsScreen: {screen:RecipesDetailsScreen},
    SettingsScreen : {screen:SettingsScreen}
}, {
        initialRouteName: "WelcomeScreen",
        defaultNavigationOptions: {
            headerTintColor: theme.palette.primaryColor,
            headerTitleStyle: { color: theme.palette.textColor }
        },
    })

const ModalStack = createStackNavigator({
    root: RootStack,
    loading: LoadingScreen
}, {
        headerMode: 'none',
        mode: 'modal',
        transparentCard: true,
        // cardStyle: {
        //     backgroundColor: 'transparent',
        //     opacity: 1,
        //  },


        // transitionConfig: () => ({
        //     transitionSpec: {
        //         duration: 300,
        //         easing: Easing.out(Easing.poly(4)),
        //         timing: Animated.timing,
        //     },
        //     screenInterpolator: sceneProps => {
        //         const { layout, position, scene } = sceneProps;
        //         const { index } = scene;

        //         const height = layout.initHeight;
        //         const translateY = position.interpolate({
        //             inputRange: [index - 1, index, index + 1],
        //             outputRange: [height, 0, 0],
        //         });

        //         const opacity = position.interpolate({
        //             inputRange: [index - 0.7, index, index + 0.7],
        //             outputRange: [0.3, 1, 0.3]
        //         })

        //         return { opacity };
        //     },
        // })
    })
const MainNavigator = createDrawerNavigator({
    main: ModalStack
}, {
        contentComponent: DrawerComponent,
    })

const lockScreens = ['WelcomeScreen', 'ForgotScreen', 'LoginScreen', 'RegisterScreen']

ModalStack.navigationOptions = ({ navigation }) => {
    let root = (navigation.state.index !== undefined ? navigation.state.routes[navigation.state.index] : navigation.state.routeName)
    console.log('rootstack', root);

    let drawerLockMode = 'locked-closed'

    const { index, routes } = root;
    if (routes) {
        const currentRoute = routes[index].routeName;
        if (lockScreens.indexOf(currentRoute) === -1) {
            drawerLockMode = 'unlocked'
        }
    }

    return {
        drawerLockMode,
    };
}

export {
    MainNavigator
}