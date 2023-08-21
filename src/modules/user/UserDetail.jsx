import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts'
import Pagetitle from '../../components/Pagetitle'
import { useNavigate, useParams } from 'react-router-dom'
import UserService from '../../services/api/Userservice';
import { Card, Descriptions } from 'antd';
import TableList from '../../components/TableList';
import toast from 'react-hot-toast';

export default function UserDetail() {
  const [dataUser, setDataUser] = useState();
  const [dataPost, setDataPost] = useState();
  const [dataAlbum, setDataAlbum] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const columsPost = [
    {
      title: "Title",
      render: (row) => row.title || "-",
      key: "title",
    },
    {
      title: "Detail",
      render: (row) => row.body || "-",
      key: "body",
    },
  ]

  const columsAlbum = [
    {
      title: "Title",
      render: (row) => row.title || "-",
      key: "title",
    },
  ]

  const fetchData = async () => {
    const respUser = await UserService.GetUserDetail(id);
    setDataUser(respUser.data)
    const respPost = await UserService.GetPostByUserId(id);
    setDataPost(respPost.data)
    const respAlbum = await UserService.GetAlbumByUserId(id);
    setDataAlbum(respAlbum.data)
  }

  const deletePostById = async (postId) => {
    const resp = await UserService.DeletePostById(postId);
    toast.success("Data Deleted!")
    return resp;
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Layouts.Content>
      <Pagetitle title={dataUser?.name} />
      <Layouts.LineBreaker />
      <Card title="Data User"
        bordered={true}
        className=" w-full border-lightRed shadow-md">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Username">{dataUser?.username}</Descriptions.Item>
          <Descriptions.Item label="Phone">{dataUser?.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{dataUser?.email}</Descriptions.Item>
          <Descriptions.Item label="Website">{dataUser?.website}</Descriptions.Item>
          <Descriptions.Item label="Address">{dataUser?.address?.city}, {dataUser?.address?.street} ({dataUser?.address?.zipcode})</Descriptions.Item>
          <Descriptions.Item label="Company">{dataUser?.company.name}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Layouts.LineBreaker />
      <Pagetitle title={`${dataUser?.name}'s Posts`} />
      <TableList
        data={dataPost}
        columns={columsPost}
        onClickDetail={(data) => navigate(`/posts/${data.id}`)}
        onDelete={(data) => deletePostById(data.id)}
      />
      <Layouts.LineBreaker />
      <Pagetitle title={`${dataUser?.name}'s Albums`} />
      <TableList removable={false} data={dataAlbum} columns={columsAlbum} onClickDetail={(data) => navigate(`/albums/${data.id}`)} />
    </Layouts.Content>
  )
}
