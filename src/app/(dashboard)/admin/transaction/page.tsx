import React from 'react'
import type { Metadata } from "next";
import Transaction from '@/components/Transaction/Transaction';
export const metadata: Metadata = {
    title: "Transaction",
    description: "Transaction",
};

export default function TransactionPage() {
    return (
        <Transaction />
    )
}
