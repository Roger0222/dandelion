import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { logoIonic } from 'ionicons/icons';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const inputStyle = {
    marginBottom: '15px',
    '--border-color': '#e0e0e0',
    '--border-radius': '8px',
    '--highlight-color-focused': 'var(--ion-color-primary)',
    '--color': '#2c3e50',
    '--placeholder-color': '#a0a0a0',
    '--placeholder-opacity': 1,
    '--label-color': '#7a7f9a',
    '--label-color-focused': 'var(--ion-color-primary)'
  };

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/dandelion/app', 'forward', 'replace');
    }, 300);
  };
  
  return (
    <IonPage>
      <IonContent className='ion-padding' style={{
        '--background': '#f8f9fa',
        '--ion-color-primary': '#4a8cff',
        '--ion-color-primary-shade': '#3a7be6',
        '--ion-color-primary-tint': '#5c9aff'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px 25px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <IonAvatar
              style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 20px',
                backgroundColor: '#f0f4ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IonIcon 
                icon={logoIonic}
                style={{ 
                  fontSize: '60px', 
                  color: 'var(--ion-color-primary)' 
                }} 
              />
            </IonAvatar>
            
            <h2 style={{
              color: '#2c3e50',
              marginBottom: '30px',
              fontWeight: '600'
            }}>Welcome Back</h2>
            
            <IonInput
              label="Email" 
              labelPlacement="floating" 
              fill="outline"
              type="email"
              placeholder="Enter Email"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
              style={inputStyle}
            />
            
            <IonInput      
              fill="outline"
              type="password"
              placeholder="Password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
              style={{
                ...inputStyle,
                marginBottom: '25px'
              }}
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
            
            <IonButton 
              onClick={doLogin} 
              expand="block" 
              shape="round"
              style={{
                height: '48px',
                fontSize: '16px',
                fontWeight: '500',
                '--box-shadow': 'none',
                marginBottom: '20px'
              }}
            >
              Sign In
            </IonButton>

            <div style={{
              color: '#7a7f9a',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              Don't have an account?{' '}
              <a 
                href="/dandelion/register" 
                style={{
                  color: 'var(--ion-color-primary)',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Register here
              </a>
            </div>
          </div>
        </div>

        {/* Reusable AlertBox Component */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        {/* IonToast for success message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;