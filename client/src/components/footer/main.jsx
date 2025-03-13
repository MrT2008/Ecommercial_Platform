import React from 'react'
import Subscribe from './subcribe'
import Support from './support'
import QuickLink from './quickLink'
import Account from './account'

const Footer = () => {
  return (
    <div className='w-full h-fit pt-8 pb-14 footer flex mt-10 justify-center'>
      <Subscribe />
      <Support />
      <Account />
      <QuickLink />
    </div>
  )
}

export default Footer