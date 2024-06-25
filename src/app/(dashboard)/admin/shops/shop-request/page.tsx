import ShopRequest from '@/components/Shops/ShopRequest'
import React from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "ShopRequest",
    description: "ShopRequest",
};

export default function ShopRequestPage() {
    return (
        <div><ShopRequest /></div>
    )
}
