import React from 'react'

export default function Bottomside({children, className}) {
  return (
    <div className={`${className} fixed left-0 bottom-0 py-3 pr-3 max-lg:pl-28 pl-56 w-full bg-quinary flex gap-4 z-10`}>
        {children}
    </div>
  )
}
