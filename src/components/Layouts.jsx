import React from 'react'

function Content({children}) {
  return (
    <div className='pl-56 w-full pt-4 pr-5'>
        {children}
    </div>
  )
}

function LineBreaker(){
  return (
    <div className=" h-1 bg-lightRed my-2" />
  )
}

function BottomSpace(){
  return (
    <div className=' bg-transparent w-full h-24' />
  )
}

const Layouts = {
    Content,
    LineBreaker,
    BottomSpace
}

export default Layouts
