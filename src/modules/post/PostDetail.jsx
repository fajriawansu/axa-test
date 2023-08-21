/* eslint-disable no-mixed-operators */
import React, { useEffect, useRef, useState } from 'react'
import UserService from '../../services/api/Userservice';
import { useParams } from 'react-router-dom';
import Layouts from '../../components/Layouts';
import MyButton from '../../components/MyButton';
import Pagetitle from '../../components/Pagetitle';
import { Button, Card, Descriptions, Form, Input, Modal } from 'antd';
import { ExclamationCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import toast from 'react-hot-toast';

export default function PostDetail() {
  const [form] = Form.useForm();
  const [dataPost, setDataPost] = useState();
  const [dataComment, setDataComment] = useState([]);
  const [editable, setEditable] = useState(false);
  const [creatable, setCreatable] = useState(false);
  const submitEditRef = useRef();
  const submitCreateRef = useRef();

  const { id } = useParams();

  const fetchData = async () => {
    const respPost = await UserService.GetPostById(id);
    setDataPost(respPost.data);
    const respComment = await UserService.GetCommentByPostId(id);
    setDataComment(respComment.data);
  }

  const showConfirm = (values) => {
    Modal.confirm({
      title: "Apakah anda yakin ingin menambahkan data ini?",
      icon: <ExclamationCircleOutlined />,
      content: "Harap cek kembali data yang akan diinput",
      okText: "Ya",
      okType: "default",
      cancelText: "Tidak",
      onOk() {
        onSubmit(values);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onSubmit = async (val) => {
    const resp = await UserService.UpdatePost(id, {
      userId: dataPost?.userId,
      ...val
    });
        if(resp.status === 200 || resp.status === 201){
            toast.success("Post Edited!")
            setEditable(false)
        }
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id] )
  return (
    <Layouts.Content>
      <Pagetitle title={
        <div className="flex justify-center items-center gap-3">
          <div>Post Details</div>
          {editable && <div className="text-base"><MyButton onClick={() => submitEditRef.current.click()}>Save</MyButton></div>}
          <div className="text-base"><MyButton onClick={() => setEditable(!editable)}>{editable ? "Cancel" : "Edit"}</MyButton></div>
        </div>
      } />
      
      <Card bordered={true}
        className=" w-full border-lightRed shadow-md">
        {!editable && <Descriptions bordered column={1}>
          <Descriptions.Item label="Title">{dataPost?.title}</Descriptions.Item>
          <Descriptions.Item label="Body">{dataPost?.body}</Descriptions.Item>
        </Descriptions> || 
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
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input defaultValue={dataPost?.title} size="middle" style={{ width: "100%" }} />
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
            <Input.TextArea defaultValue={dataPost?.body} size="middle" style={{ width: "100%" }} />
          </Form.Item>
          <Button htmlType="submit" hidden ref={submitEditRef}></Button>
        </Form>
        }
      </Card>
      <Pagetitle title={
        <div className="flex justify-center items-center gap-3">
          <div>Post Comments</div>
          {creatable && <div className="text-base"><MyButton onClick={() => submitEditRef.current.click()}>Submit</MyButton></div>}
          <div className="text-base"><MyButton onClick={() => setCreatable(!creatable)}>{creatable ? "Cancel" : "Create"}</MyButton></div>
        </div>
        
      } />
        { creatable && <Form
          layout="vertical"
          form={form}
          name="comment_form"
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => showConfirm(values)}
        >
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
          <Button htmlType="submit" hidden ref={submitCreateRef}></Button>
        </Form>}
      <Card bordered={true}
        className=" w-full border-lightRed shadow-md">
          {dataComment?.map((v,k) => {
            return <div key={k}>
              <CommentCard data={v} name={`${v.name} (${v.email})`} body={v.body} />
            </div>
          })}
      </Card>
    </Layouts.Content>
  )
}

function CommentCard({data, name ="", body}) {
  const handleDelete = async () => {
    const resp = await await UserService.DeleteCommentById(data);
    if(resp.status === 200 || resp.status === 201){
      toast.success("Comment Deleted!")
    }
  }
  const confirmDelete = () => {
    Modal.confirm({
      title: "Apakah anda yakin ingin menghapus komentar dari " + data?.email + "?",
      icon: <ExclamationCircleOutlined />,
      content: "Harap cek kembali data yang akan diinput",
      okText: "Ya",
      okType: "default",
      cancelText: "Tidak",
      onOk() {
        handleDelete();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="flex rounded-md border-solid border-2 border-red-50 p-2 gap-3 items-end">
      <div className=" rounded-full h-12 w-12 bg-yellow-200 flex items-center justify-center">
        {GetInitials(name)}
      </div>
      <div>
        <div className="flex gap-2 items-center">
            <div className=" font-bold">{name}</div>
        </div>
        {body}
      </div>
      <div className="flex gap-1">
        <MyButton type="secondary">
          <EditOutlined />
        </MyButton>
        <MyButton type="danger" onClick={confirmDelete}>
          <DeleteOutlined />
        </MyButton>
      </div>
    </div>
  );
}

function GetInitials(string) {
  var names = string.split(' '), initials = names[0].substring(0, 1).toUpperCase();
  return initials;
};