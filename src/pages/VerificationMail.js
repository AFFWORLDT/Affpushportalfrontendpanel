import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { getUserFromLocalStorage} from '../utils/localStorage';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

function VerificationMail() {
  const classes = useStyles();
  const [verificationSent, setVerificationSent] = useState(false);
  const URL2 = process.env.REACT_APP_PROD_API;
  const url = `${URL2}/api/affiliates/send_verification_mail`;
  const user2 = getUserFromLocalStorage();
  const accessToken = user2?.data.access_token;

  const sendVerificationEmail = async () => {
    // Make an API request to send the verification email.
    
        try {

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const jsonData = await response.json();
            if (response.ok) {
                setVerificationSent(true);
              }
            console.log("RESPONSE:",jsonData);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  return (
    <div>
      <p style={{marginLeft:"16px",marginTop:"10px"}}>Email Verification</p>
      <Button
        variant="contained"
        color="primary"
        onClick={sendVerificationEmail}
        className={classes.button}
        
      >
        Send Verification Email
      </Button>
      {verificationSent ? (
        <p style={{ marginLeft: "16px" }}>Verification email sent!</p>
      ) : (
        <p style={{ marginLeft: "16px" }}>User is verified!</p>
      )}
    </div>
  );
}

export default VerificationMail;
