import { Modal, Table } from "antd";
import React, { useState } from "react";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import MyButton from "./MyButton";

export default function TableList({
  data,
  onClickDetail = function () {},
  columns = [],
  loading = false,
  onDelete = function () {},
  removable= true
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedData, setDeletedData] = useState();

  const completeColumns = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (v, record) => (
        <div className="flex gap-2">
          <MyButton
            type="primary"
            onClick={() => onClickDetail(record)}
          >
            <EyeOutlined />
          </MyButton>
          {removable && <MyButton
            type="danger"
            onClick={() => {
              setIsModalOpen(true);
              setDeletedData(record);
            }}
          >
            <DeleteOutlined />
          </MyButton>}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table loading={loading} columns={completeColumns} dataSource={data} />
      <Modal
        title={`Delete "${deletedData?.title}" ?`}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="flex w-full items-center justify-center gap-2">
          <div>{deletedData?.description}</div>
        </div>
        <div className="flex gap-2 w-full justify-end mt-2">
          <MyButton type="danger" className="w-20 py-1" onClick={() => {
            onDelete(deletedData);
            setIsModalOpen(false)
          }}>
            Delete
          </MyButton>
          <MyButton
            type="secondary"
            className="w-20 py-1"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </MyButton>
        </div>
      </Modal>
    </div>
  );
}
