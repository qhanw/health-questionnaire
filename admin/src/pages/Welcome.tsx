import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Result, Card, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export default ({ history }: any): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Result
          icon={<SmileOutlined />}
          title="欢迎来到健康问卷调查管理后台!"
          extra={
            <Button type="primary" onClick={() => history.push('/statistics')}>
              开始
            </Button>
          }
        />
      </Card>
    </PageContainer>
  );
};
