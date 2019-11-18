import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/Layout';
import ProductTable from '../../components/workbench /productmanage/ProductTable';
import { Response, Route as ProdAPI } from '../../libs/API/productlist';
import Axios from 'axios';
export default function productManage() {
  const [prodData, setProdData] = useState<Response>({
    code: 0,
    data: [],
  });
  useEffect(() => {
    Axios.get<Response>(ProdAPI).then(res => setProdData(res.data));
  }, []);

  return (
    <MainLayout>
      <ProductTable data={prodData.data} />
    </MainLayout>
  );
}
