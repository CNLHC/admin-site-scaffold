import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/Layout';
import ProductTable from '../../components/workbench /productmanage/ProductTable';
import { Response, Route as ProdAPI } from '../../libs/API/productlist';
import Axios from 'axios';
import { useForm } from 'byte-form';

export default function productManage() {
  const [prodData, setProdData] = useState<Response>({
    code: 0,
    data: [],
  });
  useEffect(() => {
    Axios.get<Response>(ProdAPI).then(res => setProdData(res.data));
  }, []);
  const [a, B] = useForm({});

  return (
    <MainLayout>
      <B formMeta={[{
        key:"a",
        type:"input",

      }]}/>
      <ProductTable data={prodData} />
    </MainLayout>
  );
}
