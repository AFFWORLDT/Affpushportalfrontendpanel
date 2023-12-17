import React, { useState, useEffect } from 'react';
import "./clickLogs.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, Input } from '@mui/material';
import { toast } from 'react-toastify';
import account from 'src/_mock/account';
import { getUserFromLocalStorage } from 'src/service/localStorage';

export default function ClickLogs2() {
  let [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryOption, setCategoryOption] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [service, setService] = useState([]);
  const [sname, setSname] = useState();
  const [serviceObj, setServiceObj] = useState(null);
  const [quantity, setQuantity] = useState(100);
  var [timing, setTiming] = useState();
  const [link, setLink] = useState();
  const [maxExecutions, setMaxExecutions] = useState(1);
  const { handleSubmit, control } = useForm();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCharges, setTotalCharges] = useState(0);
  const URL = process.env.REACT_APP_PROD_FILINGSOLUTIONS_API;
  const Affiliate_URL = process.env.REACT_APP_PROD_API;
  const [remainBalance, setRemainBalance] = useState(0);
  const user2 = getUserFromLocalStorage();
  const accessToken = user2?.data.access_token;

  const getData = async () => {
    try {
      const response = await axios.get(`${URL}/api/service-list`);
      if (response.status === 200) {
        // toast.success("Services fetched successfully!!");
        setData(response?.data);
        // console.log("this is data--->", response?.data);
        setCategoryOption(data.category);
      }
    } catch (error) {
      console.error('Error fetching Data --->', error);
      toast.error("Error fetching filing hub soltion data!!");
    }
  }

  const getRemainBalance = async () => {
    try {
      const url = `${Affiliate_URL}/api/wallet/remaining-balance`;
      const data = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (data.status === 200) {
        console.log("this is remaining balance--->", data?.data?.remainingBalance);
        // toast.success("Remaining balance fetched successfully!!");
        setRemainBalance(data?.data?.remainingBalance);
      }



    } catch (error) {
      console.error('Error in  fetching remaining balance --->', error);
      toast.error("Error fetching remaining balance!!");
    }
  }

  const handleTiming = (e) => {
    const inputTiming = e.target.value;
    // Split the input into days, hours, and minutes
    const [days, hours, minutes] = inputTiming.split('/').map(Number);

    // Calculate the total milliseconds
    const totalMilliseconds = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000;
    setTiming(totalMilliseconds);
  }

  const uniqueCategories = Object.values(data).map(item => item.category);
  const uniqueCategoriesSet = [...new Set(uniqueCategories)];

  useEffect(() => {
    getData();
    getRemainBalance();
  }, []);

  const updateQunatityCharge = () => {

    let totalQuantity = 0;
    let totalCharges = 0;

    totalQuantity = quantity * maxExecutions;

    totalCharges = (quantity * maxExecutions) / 100;

    setTotalQuantity(totalQuantity);

    setTotalCharges(totalCharges);

  }

  useEffect(() => {


    updateQunatityCharge();

  }, [quantity, maxExecutions])

  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryData = data.find(item => item.category === selectedCategory);
      if (selectedCategoryData) {
        setServiceOptions(selectedCategoryData.services);
        const names = selectedCategoryData.services.map(service => service.name);
        setService(names);
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

      const res = await axios.post(`${URL}/api/jobs`, data);

      if (res.status === 200) {
        toast.success("Campagin Added successfully see Statistics!!");
      }



    } catch (error) {
      console.log("this is error While submitting the data--->", error);
      toast.error("Error While submitting the data!! See Console");
    }
  };
  return (
    <>
      <div className='text-center align-center justify-content-center d-block '>
        <h1 className='text-center'>Add Campagin</h1>
        <h2>Remaining Balance:
          {
            remainBalance < 0 ? (
              <span style={{ color: 'red' }}> ₹{remainBalance}  </span>
            ) : (
              <span style={{ color: 'green' }}> ₹{remainBalance}</span>
            )
          }
        </h2>
      </div>

      <div>
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
              value={quantity}
              placeholder='Enter quantity (Minimum 100)'
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timing">Timing (dd/hh/mm)</label>
            <Input
              fullWidth
              name="timing"
              placeholder='Enter timing (dd/hh/mm)'
              onChange={handleTiming}
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
              value={maxExecutions}
              placeholder='Enter maxExecutions'
              onChange={(e) => setMaxExecutions(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalQuantity">Total Quantity</label>
            <Input
              fullWidth
              type='number'
              name="totalQuantity"
              value={totalQuantity}
              placeholder='Total Quantity'
            />
          </div>


          <div className="form-group">
            <label htmlFor="maxExecutions">Total Charges </label>
            <Input
              fullWidth
              type='number'
              name="totalCharges"
              value={totalCharges}
              placeholder='Total Charges'

            />
          </div>

          <div className='form-group submit d-flex justify-content-center  align-items-center'>
            <Button type="submit" variant="contained" color="success" >Submit</Button>
          </div>

        </form>




      </div>



    </>
  )
}
