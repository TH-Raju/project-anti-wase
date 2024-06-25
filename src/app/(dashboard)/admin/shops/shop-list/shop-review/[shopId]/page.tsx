import ShopReview from '@/components/Shops/ShopReview'
import SurpriseBagList from '@/components/Shops/SurpriseBagList'
import React from 'react'

export default function ShopReviewPage({ params }: { params: { shopId: string } }) {
    return (
        <><ShopReview shopId={params.shopId} /></>
    )
}
