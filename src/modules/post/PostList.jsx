import React, { useEffect, useState } from 'react'
import Pagetitle from '../../components/Pagetitle'
import Layouts from '../../components/Layouts'
import TableList from '../../components/TableList'
import UserService from '../../services/api/Userservice'
import MyButton from '../../components/MyButton'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function PostList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const colums = [
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

  const fetchData = async () => {
    const resp = await UserService.GetPostList();
    setData(resp.data)

  }

  const deletePostById = async (postId) => {
    const resp = await UserService.DeletePostById(postId);
    toast.success("Data Deleted!")
    return resp;
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Layouts.Content>
      <Pagetitle title={"Post List"} />
      <MyButton onClick={() => navigate("/posts/create")}>Create New</MyButton>
      <Layouts.LineBreaker />
      <TableList
        data={data}
        columns={colums}
        onClickDetail={(data) => navigate(`/posts/${data.id}`)}
        onDelete={(data) => deletePostById(data.id)}
      />
    </Layouts.Content>
  )
}
