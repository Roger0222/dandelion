import { 
    IonAlert,
    IonButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonIcon, 
      IonItem, 
      IonMenu, 
      IonMenuButton, 
      IonMenuToggle, 
      IonPage, 
      IonRouterOutlet, 
      IonSplitPane, 
      IonTitle, 
      IonToast, 
      IonToolbar, 
      useIonRouter
  } from '@ionic/react'
  import {homeOutline, logOutOutline, rocketOutline} from 'ionicons/icons';
import { Redirect, Route } from 'react-router';
import Home from './Home';
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react';


  const Menu: React.FC = () => {
    const navigation = useIonRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    
    const path = [
        {name:'Home', url: '/dandelion/app/home', icon: homeOutline},
    ]
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setShowToast(true);
            setTimeout(() => {
                navigation.push('/dandelion', 'back', 'replace'); 
            }, 300); 
        } else {
            setErrorMessage(error.message);
            setShowAlert(true);
        }
    };

    return (
        <IonPage>
            <IonSplitPane contentId="main">
                <IonMenu contentId="main">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>
                                Menu
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {path.map((item,index) =>(
                            <IonMenuToggle key={index}>
                                <IonItem routerLink={item.url} routerDirection="forward">
                                    <IonIcon icon={item.icon} slot="start"></IonIcon>
                                    {item.name}
                                </IonItem>
                            </IonMenuToggle>
                        ))}

                       {/* Logout Button */}
                       <IonButton expand="full" onClick={handleLogout}>
                            <IonIcon icon={logOutOutline} slot="start"></IonIcon>
                            Logout
                        </IonButton>
                        
                    </IonContent>
                </IonMenu>
                
                <IonRouterOutlet id="main">
                    <Route exact path="/dandelion/app/home" component={Home} />

                    <Route exact path="/dandelion/app">
                        <Redirect to="/dandelion/app/home"/>
                    </Route>
                </IonRouterOutlet>

                {/* IonAlert for displaying login errors */}
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Logout Failed"
                    message={errorMessage}
                    buttons={['OK']}
                />
                
                {/* IonToast for success message */}
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message="Logout Successful"
                    duration={1500}
                    position="top"
                    color="primary"
                />

            </IonSplitPane>
        </IonPage>
    );
  };
  
  export default Menu;