import React from 'react'
import ShortenItem from './ShortenItem'

const ShortenUrlList = ({data}) => {
  return (
    <div>
        {data.map((item) => (
            <ShortenItem key={item.id} {...item} />
        ))}
    </div> 
  )
}

export default ShortenUrlList