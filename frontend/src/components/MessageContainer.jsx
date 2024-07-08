import React from 'react'

const MessageContainer = ( { variant, message } ) => {
  return (
    <div className={variant !== 'danger' ? 'deliveredBox' : 'notDeliveredBox'}>{message}</div>
  )
}

export default MessageContainer