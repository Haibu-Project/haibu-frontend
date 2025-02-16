import React from 'react'
import Sidebar from '@/components/sidebar/sidebar'
import ActivitySection from '@/components/activity/activity'

export default function page() {
  return (
    <div className="w-full h-screen flex justify-between px-8 py-4">
        <Sidebar />
        <ActivitySection/>
    </div>
  )
}
