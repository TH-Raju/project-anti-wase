'use client'
import React from 'react';
import { Button, Result } from 'antd';
import Link from 'next/link';

const NotfoundPage: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Link href={'/'} type="primary">Back Home</Link>}
  />
);

export default NotfoundPage;