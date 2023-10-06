import React, { useState } from 'react';
import { Container, Paper, Typography, Button, Snackbar } from '@mui/material';
import { toast } from 'react-toastify';
import { getResFromLocalStorage } from '../utils/localStorage';
import copy from 'clipboard-copy';

const DynamicAds=()=> {
  const user1=getResFromLocalStorage();
  const [affiliateId, setAffiliateId] = useState(user1.data.affiliate_id);
  
  const iframeSrc = `https://affiliate-api.affworld.in/api/misc/iframe_code?affiliate_id=${affiliateId}`;

  const iframeCode = `<iframe src="${iframeSrc}" style="border:none, width:1000px, height:400px"></iframe>`;

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAff = () => {
    const link = `<iframe src="${iframeSrc}" style={{border:"none", width:"1000px", height:"400px"}}></iframe>`;
    console.log('Copy clicked');
    console.log('Link is -->', link);
    console.log('This is res --->', user1);
    console.log('This is user affiliate id -----> :', user1.data.affiliate_id);

    try {


       copy(link);
       
      toast.success('Link copied to clipboard', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error('Error copying link to clipboard:', error);
      toast.error('Error copying link to clipboard', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" style={{marginBottom:"25px"}}>Your Advertisements Code</Typography>
        <div style={{display:"flex",justifyContent:"center"}}>
          <pre style={{ width:"75%",backgroundColor:"#D3D3D3",whiteSpace: 'pre-wrap', wordBreak: 'break-word',border:"2px solid #D3D3D3",borderRadius:"10px",marginRight:"10px"}}>
            <code>{iframeCode}</code>
          </pre>
          <Button 
          variant="contained" style={{height:"25%",width:"25%",background: "#FAC8C8",color: "#580B0B",fontWeight:700,fontFamily:"Inconsolata"

        }} onClick={handleCopyAff}
          >
          Copy to Clipboard
        </Button>
        
        </div>
        
      </Paper>
    </Container>
  );
}

export default DynamicAds;
