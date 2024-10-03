import React from 'react'
import Header from '@/components/Header'

export default function About() {
  return (
    <div>
      <Header />
   <div className='mt-5'>
   <div className='text-center mb-12'>
      <h1 className='font-bold text-lg mb-4 text-amber-500'>About James Thiga Enterprises</h1>
      <h2 className='font-bold'>Mission Statement</h2>
      </div>
     <div className='m-4'>
     <p className='pb-6'>
      At James Thiga Enterprises, we believe that environments shape our thoughts and feelings, whether we are at home, at work or on the go. We work every day to better our surroundings through the power of design. A family business in its third generation, James Thiga Enterprises follows an environmental, cultural and commercial mission.
      </p>
      <p>Environmental consciousness finds expression in every aspect of Vitra’s work. It is manifested in how James Thiga Enterprises develops and manufactures its products, in the sourcing of raw materials and the organisation of its supply chain. Every new insight is regarded as an opportunity for further development.
      </p>
     </div>
   </div>
    </div>
  )
}
