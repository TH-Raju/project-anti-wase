import ShopDetails from '@/components/Shops/ShopDetails'
import React from 'react'

export default function ShopDetailsPage({ params }: { params: { shopId: string } }) {
    return (
        <>
            <ShopDetails shopId={params.shopId} />
        </>
    )
}
