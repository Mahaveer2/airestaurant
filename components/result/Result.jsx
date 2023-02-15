import React, { useEffect ,useState} from 'react';
import { Dialog } from '@headlessui/react'
import { saveAs } from 'file-saver'
import { useRouter } from 'next/router'
import { checkout } from '../../utils/checkout';


const Result = ({ desc, images, subscribed }) => {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false)
  function watermakImageWithText(originalImage) {
  
  }
  
  const handleDownload = () => {
    if(!subscribed){
      setIsOpen(true);
    }else{
      images.forEach(img => {
        saveAs(img.url, `${img.id}-image.jpg`)
      });  
    }
  }

  useEffect(() => {
    if (images) {
      
    }
  }, []);

  return (
    <div className="">
      <div className="results w-[90%] mx-auto mt-10">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Description</h1>
          <button onClick={handleDownload}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
        </div>
        <span className='text-gray-400'>Your data will be deleted under 24hours</span>
        <p>{desc}</p>
        <div className="grid md:grid-cols-2 mt-4 grid-cols-1 gap-5">
          {images?.map((img,id) => {
            return (
              <img key={`${Math.floor(Math.random())}`+id} className="rounded-lg" src={img.url} alt="Product Image" />
            );
          })}
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 flex items-center top-0 justify-center p-4 backdrop-blur ">
      
      <Dialog.Panel className='bg-[rgba(255,255,255,.1)] shadow rounded-xl p-5'>
      <button className='text-xl' onClick={() => setIsOpen(false)}>&times;</button>
        <Dialog.Title className='text-3xl text-center'>Want to download the images</Dialog.Title>
        <Dialog.Description className='text-xl mt-5 text-gray-400'>
          Buy the images for $0.99 or consider buying a monthly subscription
        </Dialog.Description>
        
        <div className='flex justify-center w-full'>
        <button onClick={() =>router.push('/')} class=" mt-10 relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group">
<span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
<span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
<span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
<span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
<span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
<span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
<span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
<span class="relative">Subscription</span>
</button>
        <button onClick={() => checkout({
          lineItems:[{
            price:'price_1MbfU1FbuSFlLnppSPZlo2ag',
            quantity:1,
          }]
        })} class="ml-5 mt-10 relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group">
<span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
<span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
<span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
<span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
<span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
<span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
<span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
<span class="relative">Buy $0.99</span>
</button>
        </div>
      </Dialog.Panel>
      </div>
    </Dialog>
    </div>
  );
};

export default Result;
