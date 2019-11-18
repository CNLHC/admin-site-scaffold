import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import EditableTable from './EdiableTable';


const EditableFormTable = Form.create<any>()(EditableTable);

export default EditableFormTable;
