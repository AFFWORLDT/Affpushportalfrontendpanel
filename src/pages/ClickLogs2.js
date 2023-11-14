import React, { useState, useEffect } from 'react';
import "./clickLogs.css"
import { useForm, Controller } from 'react-hook-form';
// import navConfig from 'src/layouts/dashboard/nav/config';
import axios from 'axios';
import { getUserFromLocalStorage } from 'src/service/localStorage';
import { Button, Input } from '@mui/material';
import { toast } from 'react-toastify';
import account from 'src/_mock/account';

export default function ClickLogs2() {
  const user = getUserFromLocalStorage();
  
  let [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryOption, setCategoryOption] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [service, setService] = useState([]);
  const [sname, setSname] = useState();
  const [serviceID, setServiceID] = useState();
  const [serviceObj, setServiceObj] = useState(null);
  const [quantity, setQuantity] = useState();
  const [timing, setTiming] = useState();
  const [link, setLink] = useState();
  const [maxExecutions, setMaxExecutions] = useState();
  const { handleSubmit, control } = useForm();
  const accessToken = user.data.access_token;

  const getData = async () => {
    try {
      const response = await axios.get("https://auto-api-affworld.vercel.app/api/service-list");

      console.log("this is response filing hub", response.data);
      setData(response.data);
      setCategoryOption(data.category);
      console.log("this is setCategoryOption", categoryOption);

    } catch (error) {
      console.error('Error fetching filing hub soltion data:', error);
    }
  }

  const uniqueCategories = Object.values(data).map(item => item.category);
  const uniqueCategoriesSet = [...new Set(uniqueCategories)];

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if (selectedCategory) {
  //     const selectedCategoryData = data.find(item => item.category === selectedCategory);
  //     if (selectedCategoryData) {
  //       const names = selectedCategoryData.services.map(service => service.name);
  //       setService(names);
  //     }
  //   }
  // }, [selectedCategory, data]);

  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryData = data.find(item => item.category === selectedCategory);
      if (selectedCategoryData) {
        setServiceOptions(selectedCategoryData.services);
        const names = selectedCategoryData.services.map(service => service.name);
        const serviceIds = selectedCategoryData.services.map(service => service.serviceId);
        setService(names);
        // setServiceID(serviceIds);
      }
    }
  }, [selectedCategory, data]);

  const onSubmit = async () => {
    try {
      const data = {
        name: sname,
        serviceId: serviceObj,
        quantity: quantity,
        timing: timing,
        link: link,
        maxExecutions: maxExecutions,
        affiliate_id: account.affiliate_id
      };
      console.log("This is service object --->", serviceObj);
      console.log("This is data we are posting--->", data);

      const res = await axios.post("https://auto-api-affworld.vercel.app/api/jobs", data);
      // const res = await axios.post("http://localhost:4000/api/jobs", data);


      console.log("this is res while submirtting the data--->", res);
      if(res.status === 200) {
        toast.success("Data submitted successfully!!");
      }
      


    } catch (error) {
      console.log("this is error While submitting the data--->", error);
      toast.error("Error While submitting the data!! See Console");
    }
  };


  // const onSubmit = async () => {
  //   try {
  //     const selectedService = serviceOptions.find(option => option.name === service);
  //     const serviceID = selectedService ? selectedService.serviceId : null;

  //     const data = {
  //       name: sname,
  //       serviceId: serviceID,
  //       quantity: quantity,
  //       timing: timing,
  //       link: link,
  //       maxExecutions: maxExecutions
  //     };

  //     console.log("This is data we are posting--->", data);

  //     // const response = await axios.post("https://auto-api-affworld.vercel.app/api/click-log", data, {

  //     // })

  //   } catch (error) {
  //     console.log("this is error While submitting the data--->", error);
  //     toast.error("Error While submitting the data!! See Console");
  //   }
  // };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Input
            fullWidth
            name="name"
            onChange={(e) => setSname(e.target.value)}
            placeholder="Enter Service name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="categoryDropdown"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            {uniqueCategoriesSet.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label htmlFor="services">Services</label>
          <select onChange={(e) => setServiceObj(e.target.value)}>
            {serviceOptions?.map((option, index) => (
              <option key={index} value={option.serviceId}>
                {option.name}
              </option>
            ))}
          </select>
        </div>



        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <Input
            fullWidth
            name="quantity"
            type='number'
            placeholder='Enter quantity'
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalCharges">Charges</label>
          <Input
            fullWidth
            name="Charges"
            placeholder='Enter Charges'
          />
        </div>

        <div className="form-group">
          <label htmlFor="timing">Timing</label>
          <Input
            fullWidth
            name="timing"
            type='number'
            placeholder='Enter timing'
            onChange={(e) => setTiming(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Link</label>
          <Input
            fullWidth
            name="link"
            placeholder='Enter link'
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxExecutions">Max Executions</label>
          <Input
            fullWidth
            type='number'
            name="maxExecutions"
            placeholder='Enter maxExecutions'
            onChange={(e) => setMaxExecutions(e.target.value)}
          />
        </div>

        <div className='form-group submit d-flex justify-content-center  align-items-center'>
          <Button type="submit" variant="contained" color="success" >Submit</Button>
        </div>

      </form>
    </>
  )
}
