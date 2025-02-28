import React from 'react'
import { Oracle } from '@chopinframework/next'

export default function Page() {
  return (
    <div>{Oracle.now()}</div>
  )
}
