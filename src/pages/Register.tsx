import React, { useState } from 'react';
import {
    IonButton,
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonPage,
    IonTitle,
    IonModal,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAlert,
    IonIcon,
    IonAvatar
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs-react';
import { logoIonic } from 'ionicons/icons';

// Reusable Alert Component
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

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

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

    const handleOpenVerificationModal = () => {
        if (!email.endsWith("@nbsc.edu.ph")) {
            setAlertMessage("Only @nbsc.edu.ph emails are allowed to register.");
            setShowAlert(true);
            return;
        }

        if (password !== confirmPassword) {
            setAlertMessage("Passwords do not match.");
            setShowAlert(true);
            return;
        }

        setShowVerificationModal(true);
    };

    const doRegister = async () => {
        setShowVerificationModal(false);
    
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });
    
            if (error) {
                throw new Error("Account creation failed: " + error.message);
            }
    
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            const { error: insertError } = await supabase.from("users").insert([
                {
                    username,
                    user_email: email,
                    user_firstname: firstName,
                    user_lastname: lastName,
                    user_password: hashedPassword,
                },
            ]);
    
            if (insertError) {
                throw new Error("Failed to save user data: " + insertError.message);
            }
    
            setShowSuccessModal(true);
        } catch (err) {
            if (err instanceof Error) {
                setAlertMessage(err.message);
            } else {
                setAlertMessage("An unknown error occurred.");
            }
            setShowAlert(true);
        }
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
                        }}>Create Your Account</h2>
                        
                        <IonInput
                            label="Username" 
                            labelPlacement="floating" 
                            fill="outline"
                            type="text"
                            placeholder="Enter a unique username"
                            value={username}
                            onIonChange={e => setUsername(e.detail.value!)}
                            style={inputStyle}
                        />
                        
                        <IonInput
                            label="First Name" 
                            labelPlacement="floating" 
                            fill="outline"
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onIonChange={e => setFirstName(e.detail.value!)}
                            style={inputStyle}
                        />
                        
                        <IonInput
                            label="Last Name" 
                            labelPlacement="floating" 
                            fill="outline"
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onIonChange={e => setLastName(e.detail.value!)}
                            style={inputStyle}
                        />
                        
                        <IonInput
                            label="Email" 
                            labelPlacement="floating" 
                            fill="outline"
                            type="email"
                            placeholder="youremail@nbsc.edu.ph"
                            value={email}
                            onIonChange={e => setEmail(e.detail.value!)}
                            style={inputStyle}
                        />
                        
                        <IonInput
                            label="Password" 
                            labelPlacement="floating" 
                            fill="outline"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onIonChange={e => setPassword(e.detail.value!)}
                            style={inputStyle}
                        >
                            <IonInputPasswordToggle slot="end" />
                        </IonInput>
                        
                        <IonInput
                            label="Confirm Password" 
                            labelPlacement="floating" 
                            fill="outline"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onIonChange={e => setConfirmPassword(e.detail.value!)}
                            style={{
                                ...inputStyle,
                                marginBottom: '25px'
                            }}
                        >
                            <IonInputPasswordToggle slot="end" />
                        </IonInput>
                        
                        <IonButton 
                            onClick={handleOpenVerificationModal} 
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
                            Register
                        </IonButton>

                        <div style={{
                            color: '#7a7f9a',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}>
                            Already have an account?{' '}
                            <a 
                                href="/dandelion/" 
                                style={{
                                    color: 'var(--ion-color-primary)',
                                    textDecoration: 'none',
                                    fontWeight: '500'
                                }}
                            >
                                Sign in
                            </a>
                        </div>
                    </div>
                </div>

                {/* Verification Modal */}
                <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
                    <IonContent className="ion-padding" style={{ '--background': '#f8f9fa' }}>
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
                            <IonCard style={{
                                width: '100%',
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '25px',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                            }}>
                                <IonCardHeader>
                                    <IonCardTitle style={{
                                        color: '#2c3e50',
                                        fontSize: '1.25rem',
                                        fontWeight: '600',
                                        marginBottom: '15px'
                                    }}>Registration Details</IonCardTitle>
                                    <hr style={{
                                        border: 'none',
                                        height: '1px',
                                        backgroundColor: '#e0e0e0',
                                        margin: '15px 0'
                                    }} />
                                    
                                    <IonCardSubtitle style={{
                                        color: '#7a7f9a',
                                        fontSize: '0.875rem',
                                        marginBottom: '5px'
                                    }}>Username</IonCardSubtitle>
                                    <IonText style={{
                                        color: '#2c3e50',
                                        fontSize: '1rem',
                                        display: 'block',
                                        marginBottom: '15px'
                                    }}>{username}</IonText>

                                    <IonCardSubtitle style={{
                                        color: '#7a7f9a',
                                        fontSize: '0.875rem',
                                        marginBottom: '5px'
                                    }}>Email</IonCardSubtitle>
                                    <IonText style={{
                                        color: '#2c3e50',
                                        fontSize: '1rem',
                                        display: 'block',
                                        marginBottom: '15px'
                                    }}>{email}</IonText>

                                    <IonCardSubtitle style={{
                                        color: '#7a7f9a',
                                        fontSize: '0.875rem',
                                        marginBottom: '5px'
                                    }}>Name</IonCardSubtitle>
                                    <IonText style={{
                                        color: '#2c3e50',
                                        fontSize: '1rem',
                                        display: 'block',
                                        marginBottom: '25px'
                                    }}>{firstName} {lastName}</IonText>
                                </IonCardHeader>
                                
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'flex-end',
                                    gap: '10px'
                                }}>
                                    <IonButton 
                                        fill="clear" 
                                        onClick={() => setShowVerificationModal(false)}
                                        style={{
                                            color: '#7a7f9a',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Cancel
                                    </IonButton>
                                    <IonButton 
                                        color="primary" 
                                        onClick={doRegister}
                                        style={{
                                            fontWeight: '500',
                                            '--box-shadow': 'none'
                                        }}
                                    >
                                        Confirm
                                    </IonButton>
                                </div>
                            </IonCard>
                        </div>
                    </IonContent>
                </IonModal>

                {/* Success Modal */}
                <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
                    <IonContent className="ion-padding" style={{ 
                        '--background': '#f8f9fa',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '40px 25px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                            maxWidth: '500px',
                            width: '100%'
                        }}>
                            <IonTitle style={{ 
                                color: '#2c3e50',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                marginBottom: '20px'
                            }}>Registration Successful 🎉</IonTitle>
                            
                            <IonText style={{
                                color: '#7a7f9a',
                                marginBottom: '30px',
                                display: 'block'
                            }}>
                                <p>Your account has been created successfully.</p>
                                <p>Please check your email address.</p>
                            </IonText>
                            
                            <IonButton 
                                routerLink="/dandelion" 
                                routerDirection="back" 
                                color="primary"
                                style={{
                                    width: '100%',
                                    fontWeight: '500',
                                    '--box-shadow': 'none'
                                }}
                            >
                                Go to Login
                            </IonButton>
                        </div>
                    </IonContent>
                </IonModal>

                <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
            </IonContent>
        </IonPage>
    );
};

export default Register;