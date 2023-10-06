import React from 'react'
import loader from "../images/loader.gif";


function Loader() {
  return (
    <div className='text-center align-center justify-content-center d-block '>
      <img style={{height:200, width:250, margin:'auto', marginLeft:350}} src={loader} alt="" />
    </div>
  )
}

export default Loader
