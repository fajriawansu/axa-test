import React, { useEffect, useState } from 'react'
import UserService from '../../services/api/Userservice';
import { useParams } from 'react-router-dom';
import Pagetitle from '../../components/Pagetitle';
import { Card, Descriptions, Table } from 'antd';
import Layouts from '../../components/Layouts';

export default function AlbumDetail() {
  const [dataAlbum, setDataAlbum] = useState();
  const [dataPhoto, setDataPhoto] = useState([]);

  const { id } = useParams();

  const colums = [
    {
      title: "Title",
      render: (row) => row.title || "-",
      key: "title",
    },
    {
      title: "Thumbnail",
      render: (row) => <img src={row.url} width={100} height={100} alt={row?.title} /> || "-",
      key: "title",
    },
    {
      title: "Image",
      render: (row) => <img src={row.url} width={100} height={100} alt={row?.title} /> || "-",
      key: "title",
    },
  ]

  const fetchData = async () => {
    const respPost = await UserService.GetPostById(id);
    setDataAlbum(respPost.data);
    const respComment = await UserService.GetPhotoByAlbumId(id);
    setDataPhoto(respComment.data);
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id] )
  return (
    <Layouts.Content>
      <Pagetitle title="Album Details" />
      
      <Card bordered={true}
        className=" w-full border-lightRed shadow-md">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Title">{dataAlbum?.title}</Descriptions.Item>
          <Descriptions.Item label="Body">{dataAlbum?.body}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Layouts.LineBreaker />
      <Pagetitle title={`${dataAlbum?.title}'s Photos`} />
      <Table columns={colums} dataSource={dataPhoto} />
    </Layouts.Content>
  )
}
