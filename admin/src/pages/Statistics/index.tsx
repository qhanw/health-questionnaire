import { Button } from 'antd';
import type { FormInstance } from 'antd';
import React, { useRef } from 'react';
import { request } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
// import { stringify } from 'qs';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const fetchList = async ({ current, keyword, ...rest }: any) => {
    const res: any = await request('http://api.1dgt.com/pc/wenJuan/getList', {
      // method: 'POST',
      params: {
        page: current,
        ...rest,
        keyword: keyword || '',
      },
    });
    const { list = [], pagination } = res?.data || {};
    return { data: list, total: pagination?.total || 0, success: true };
  };

  // const { run } = useRequest(
  //   (data) =>
  //     request('http://api.1dgt.com/pc/wenJuan/setLabel', {
  //       method: 'POST',
  //       data,
  //     }),
  //   {
  //     manual: true,
  //     formatResult: (res) => res || {},
  //     onSuccess: (res) => {
  //       if (res.code === 1) {
  //         actionRef.current?.reload();
  //         message.success('标记成功');
  //       } else {
  //         message.success('标记失败');
  //       }
  //     },
  //   },
  // );

  const columns: ProColumns<API.RuleListItem>[] = [
    // { title: '地址', dataIndex: 'keyword', hideInTable: true },
    // {
    //   title: '标签',
    //   dataIndex: 'label',
    //   valueEnum: { normal: { text: '正常' }, abnormal: '异常' },
    //   renderText: (v) =>
    //     v ? (
    //       <Tag color={v === 'normal' ? 'success' : 'error'}>{v === 'normal' ? '正常' : '异常'}</Tag>
    //     ) : (
    //       '-'
    //     ),
    //   width: 64,
    // },
    { title: '手机', dataIndex: 'mobile', search: false },
    { title: '地址', dataIndex: 'address', search: false },
    { title: '居住地', dataIndex: 'residence', search: false, width: 58 },
    { title: '性别', dataIndex: 'sex', search: false, width: 44 },
    { title: '年龄', dataIndex: 'age', search: false, width: 44 },
    { title: '婚姻状况', dataIndex: 'marriage', search: false, width: 88 },
    { title: '民族', dataIndex: 'nation', search: false, width: 44 },

    { title: '学历', dataIndex: 'education', search: false },

    { title: '家庭常住人口', dataIndex: 'population', search: false },
    { title: '从事工作', dataIndex: 'job', search: false },
    { title: '月收入', dataIndex: 'income', search: false },
    // {
    //   fixed: 'right',
    //   title: '操作',
    //   width: 72,
    //   valueType: 'option',
    //   render: (_, record) => (
    //     <Space>
    //       <a
    //         onClick={() =>
    //           run({ ids: [record?.id], label: record.label === 'normal' ? 'abnormal' : 'normal' })
    //         }
    //       >
    //         标记{record.label === 'normal' ? '异常' : '正常'}
    //       </a>
    //     </Space>
    //   ),
    // },
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
        // rowSelection={{}}
        search={false}
        request={fetchList}
        options={{
          search: {
            enterButton: true,
            allowClear: true,
            placeholder: '请输入地址',
          },
        }}
        columns={columns}
        // tableAlertOptionRender={({ onCleanSelected, selectedRowKeys }) => {
        //   return (
        //     <Space size={16}>
        //       <a onClick={onCleanSelected}>取消选择</a>
        //       <a onClick={() => run({ ids: selectedRowKeys, label: 'normal' })}>批量标记正常</a>
        //       <a onClick={() => run({ ids: selectedRowKeys, label: 'abnormal' })}>批量标记异常</a>
        //     </Space>
        //   );
        // }}
      />
    </PageContainer>
  );
};

export default TableList;
