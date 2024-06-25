import ServiceEdit from '@/components/service/editService'
import React from 'react'

export default function EditServicePage({ params }: { params: { serviceId: string } }) {
  return (
    <>
      <ServiceEdit serviceId={params.serviceId} />
    </>
  )
}
