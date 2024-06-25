import SurpriseBagList from '@/components/Shops/SurpriseBagList'
import React from 'react'

export default function SurpriseBagListPage({ params }: { params: { shopId: string } }) {
    return (
        <><SurpriseBagList shopId={params.shopId} /></>
    )
}
