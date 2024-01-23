import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Card, Skeleton} from 'antd';

const {Meta} = Card;

export const CardSkeleton = () => {
  const isLoading: boolean = true;
  return (
    <Card
      style={{width: 300, height: 145}}
      actions={[
        <EditOutlined key="edit"/>,
        <DeleteOutlined key="ellipsis"/>,
      ]}
    >
      <Skeleton
        loading={isLoading}
        paragraph={{
          rows: 2,
          width: 200,
          style: {height: 33, marginTop: 0}
      }}
        title={false}
        active
      >
        <Meta
          title="Card title"
          description="This is the description"
        />
      </Skeleton>
    </Card>
  );
};
