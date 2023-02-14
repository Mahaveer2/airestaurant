import React, { useState } from 'react';
import Input from '@/components/ui/Input/Input';
import LoadingDots from 'components/ui/LoadingDots';
import Button from '@/components/ui/Button/Button';
import Result from '../components/result/Result';

const create = () => {
  const [data,setData] = useState([]);
  const [isData,setISDATA] = useState(false);
  const [loading,setLoading] = useState(false);
  const handleSubmit = async (event) => {
    setLoading(true);
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const form = new FormData(event.target);

    const data = {
      dish:form.get('dish'),
      ingredients:form.get('ingredients'),
      number:form.get('number'),
      theme:form.get('theme'),
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    const endpoint = '/api/form';

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json'
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata
    };

    event.target.reset();

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setData(result.data);
    console.log(result.data)
    setLoading(false);
    setISDATA(true);
  };
  return (
    <div className="flex w-full justify-center items-center flex-col mb-10">
      {loading ? <LoadingDots/> : <>
      {isData ? <div><Result desc={data.description} images={data.images} /></div>: <form onSubmit={e => handleSubmit(e)} className="w-[90%] md:w-[80%] mx-auto mt-5">
      <h1 className="text-4xl my-4">Create</h1>
        <div className="w-full flex justify-between gap-3 md:flex-row flex-col">
          <div className="w-full">
            <Input
              name="dish"
              required
              minLength={3}
              placeholder="Enter dish name"
            />
          </div>
          <div className="w-full">
            <Input
              name="ingredients"
              required
              minLength={4}
              placeholder="Enter dish ingredients"
            />
          </div>
        </div>
        <div className="mt-3">
          <Input
            required
            name="number"
            type="number"
            placeholder="No. of ingredients"
          />
        </div>
        <div className="mt-3">
          <select
            required
            name="theme"
            className="w-full px-8 py-3 text-xl h-[60px] text-zinc-400 bg-black border border-gray-500 rounded"
          >
            <option value="Bright">Bright</option>
            <option value="Dark">Dark</option>
            <option value="Colorful">Colorful</option>
          </select>
        </div>
        <Button className="mt-3">Submit</Button>
      </form>}</> }
    </div>
  );
};

export default create;
