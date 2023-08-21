import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Bottomside from "../../components/Bottomside";
import MyButton from "../../components/MyButton";
import { useNavigate, useParams } from "react-router-dom";
import Layouts from "../../components/Layouts";
import Pagetitle from "../../components/Pagetitle";
import UserService from "../../services/api/Userservice";
import toast from "react-hot-toast";

export default function PostForm() {
  const [form] = Form.useForm();
  const [dataUser, setDataUser] = useState([]);
  const submitButtonRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (val) => {
    if(!id){
        const resp = await UserService.CreatePost(val);
        if(resp.status === 200 || resp.status === 201){
            toast.success("New Post Created!")
            navigate("/posts")
        }
    }
  };
  const showConfirm = (values) => {
    Modal.confirm({
      title: "Apakah anda yakin ingin menambahkan data ini?",
      icon: <ExclamationCircleOutlined />,
      content: "Harap cek kembali data yang akan diinput",
      okText: "Ya",
      okType: "default",
      cancelText: "Tidak",
      onOk() {
        handleSubmit(values);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const fetchUser = async () => {
    const resp = await UserService.GetUserList();
    setDataUser(resp?.data);
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <Layouts.Content>
      <Pagetitle title={id ? "Edit Post" : "Create New Post"} />
      <Form
        layout="vertical"
        form={form}
        name="post_form"
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => showConfirm(values)}
      >
        <Form.Item
          label="Created By"
          name="userId"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
        >
          <Select size="middle" style={{ width: "100%" }}
          options={dataUser?.map((v,k) => ({
            value: v?.id,
            label: `${v?.name} (${v.email})`
          }))}
          />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
        >
          <Input size="middle" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          rules={[
            {
              required: true,
              message: "This field is required!",
            },
          ]}
        >
          <Input.TextArea size="middle" style={{ width: "100%" }} />
        </Form.Item>
        <Button htmlType="submit" hidden ref={submitButtonRef}></Button>
      </Form>
      <Bottomside>
        <MyButton onClick={() => submitButtonRef.current.click()}>
          Save
        </MyButton>
        <MyButton type="secondary" onClick={() => navigate("/posts")}>
          Back
        </MyButton>
      </Bottomside>
    </Layouts.Content>
  );
}
