import ShopList from '@/components/Shops/ShopList'
import React from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "ShopList",
    description: "ShopList",
};

export default function ShopListPage() {
    return (
        <div><ShopList /></div>
    )
}
