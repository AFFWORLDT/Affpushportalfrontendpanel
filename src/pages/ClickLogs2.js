import React, { useState, useEffect } from 'react';

// import './ClickLogs2.css'; // Import your CSS file
// import "./ClickLogs.css";
// import "./clicklogs1.css";
import "./clickLogs.css"
import { useForm, Controller } from 'react-hook-form';
import navConfig from 'src/layouts/dashboard/nav/config';
import axios from 'axios';
import { getUserFromLocalStorage } from 'src/service/localStorage';

export default function ClickLogs2() {
  const user = getUserFromLocalStorage();
  console.log(">>>>", navConfig);
  const genderOptions = navConfig;
  
  const { handleSubmit, control } = useForm();
  let data;
  const accessToken = user.data.access_token;
  const getData = async () => {
    return await axios.get("https://filingsolutions.in/api/service-list", {
      // headers: {
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${accessToken}`,
      // },
    });
}


useEffect(()=> {
  data = getData();
}, [])
  console.log("_________", data);

  const onSubmit = (data) => {
    console.log(data); // You can handle form submission here

    // await axios.get
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} type="text" />}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <Controller
          name="category"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select {...field}>
              {genderOptions.map((option, index) => (
                <option key={index} value={option.path}>
                  {option.title}
                </option>
              ))}
            </select>
          )}
        />
      </div>
      <div className="form-group">
        <label htmlFor="services">Services</label>
        <Controller
          name="services"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select {...field}>
              {genderOptions.map((option, index) => (
                <option key={index} value={option.path}>
                  {option.title}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <Controller
          name="quantity"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} type="number" />}
        />
      </div>
      <div className="form-group">
        <label htmlFor="totalCharges">Charges</label>
        <Controller
          name="totalCharges"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} type="number" />}
        />
      </div>

      <div className="form-group">
        <label htmlFor="timing">Timing</label>
        <Controller
          name="timing"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} type="text" />}
        />
      </div>
      <div className="form-group">
        <label htmlFor="link">Link</label>
        <Controller
          name="link"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} type="text" />}
        />
      </div>
      <div className="form-group">
        <label htmlFor="maxExecutions">Max Executions</label>
        <Controller
          name="maxExecutions"
          control={control}
          defaultValue={undefined}
          render={({ field }) => <input {...field} type="number" />}
        />
      </div>
      <div className="form-group">
        <label htmlFor="totalQuantity">Total Quantity</label>
        <Controller
          name="totalQuantity"
          control={control}
          defaultValue={undefined}
          render={({ field }) => <input {...field} type="number" />}
        />
      </div>
      <div className="form-group">
        <label htmlFor="totalCharges">Total Charges</label>
        <Controller
          name="totalCharges"
          control={control}
          defaultValue={0}
          render={({ field }) => <input {...field} type="number" />}
        />
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
    </>
  )
}
