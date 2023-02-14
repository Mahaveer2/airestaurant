import React from 'react'

const Result = ({desc,images}) => {
  return (
    <div className=''>
      <div className='results w-[90%] mx-auto mt-10'>
        <div className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Description</h1>
        <button onClick={() => alert("Did you like it!")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>

        </button>
        </div>
        <p>{desc}</p>
        <div className='grid md:grid-cols-2 mt-4 grid-cols-1 gap-5'>
          {images.map(img => {
            return <img className='rounded-lg' src={img.url} alt="Product Image" />
          })}
        </div>
      </div>
    </div>
  )
}

export default Result