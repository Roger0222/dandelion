import { 
    IonButton,
    IonButtons,
    IonContent, 
    IonHeader, 
    IonIcon, 
    IonLabel, 
    IonMenuButton, 
    IonPage, 
    IonRouterOutlet, 
    IonTabBar, 
    IonTabButton, 
    IonTabs, 
    IonTitle, 
    IonToolbar 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import Favorites from './Tabs/Favorites';
import Search from './Tabs/Search';
import Dashboard from './Tabs/Dashboard';
import { bookmarksOutline, clipboardOutline, searchCircleOutline } from 'ionicons/icons';

const Home: React.FC = () => {
    const tabs = [
        { name: 'Dashboard', tab: 'dashboard', url: '/dandelion/app/home/dashboard', icon: clipboardOutline },
        { name: 'Search', tab: 'search', url: '/dandelion/app/home/search', icon: searchCircleOutline },
        { name: 'Favorites', tab: 'favorites', url: '/dandelion/app/home/favorites', icon: bookmarksOutline }
    ];

    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/dandelion/app/home/dashboard" component={Dashboard} />
                    <Route exact path="/dandelion/app/home/search" component={Search} />
                    <Route exact path="/dandelion/app/home/favorites" component={Favorites} />
                    <Route exact path="/dandelion/app/home">
                        <Redirect to="/dandelion/app/home/dashboard" />
                    </Route>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                    {tabs.map((item, index) => (
                        <IonTabButton key={index} tab={item.tab} href={item.url}>
                            <IonIcon icon={item.icon} />
                            <IonLabel>{item.name}</IonLabel>
                        </IonTabButton>
                    ))}
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
};

export default Home;