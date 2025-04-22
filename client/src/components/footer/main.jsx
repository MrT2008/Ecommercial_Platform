import React from 'react'
import Subscribe from './subcribe'
import Support from './support'
import Account from './account'
import QuickLink from './quickLink'
const Footer = () => {
  return (
    <div className='w-full bg-blue-950 pt-8 pb-14 px-4 md:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-wrap justify-between'>
          <Subscribe />
          <Support />
          <Account />
          <QuickLink />
        </div>
      </div>
    </div>
  )
}

export default Footer