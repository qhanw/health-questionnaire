import React, { useRef } from 'react';
import { request } from '@umijs/max';
import { Button } from 'antd';
import type { FormInstance } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const fetchList = async ({ keyword, ...rest }: any) => {
    const res: any = await request('http://localhost:4000/qtn', {
      params: { ...rest, keyword: keyword || '' },
    });
    const { list = [], pagination } = res?.data || {};
    return { data: list, total: pagination?.total || 0, success: true };
  };

  const columns: ProColumns<API.RuleListItem>[] = [
    { title: '手机', dataIndex: 'tel', search: false },
    { title: '地址', dataIndex: 'A1', search: false },
    { title: '居住地', dataIndex: 'A2', search: false, width: 58 },
    { title: '性别', dataIndex: 'A3', search: false, width: 44 },
    { title: '年龄', dataIndex: 'A4', search: false, width: 44 },
    { title: '婚姻状况', dataIndex: 'A5', search: false, width: 88 },
    { title: '民族', dataIndex: 'A6', search: false, width: 44 },
    { title: '学历', dataIndex: 'A7', search: false },
    { title: '家庭常住人口', dataIndex: 'A8', search: false },
    { title: '从事工作', dataIndex: 'A9', search: false },
    { title: '月收入', dataIndex: 'A10', search: false },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="查询表格"
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="export"
            // onClick={() => {
            //   window.location.href = `http://api.1dgt.com/pc/wenJuan/exportCsv${stringify(
            //     formRef.current?.getFieldsValue(),
            //     { addQueryPrefix: true },
            //   )}`;
            // }}
            onClick={() => {
              window.location.href = `http://api.1dgt.com/pc/wenJuan/exportCsv`;
            }}
          >
            导出
          </Button>,
        ]}
        search={false}
        request={fetchList}
        options={{ search: { enterButton: true, allowClear: true, placeholder: '请输入地址' } }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
