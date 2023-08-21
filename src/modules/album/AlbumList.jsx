import React, { useEffect, useState } from 'react'
import Pagetitle from '../../components/Pagetitle'
import Layouts from '../../components/Layouts'
import TableList from '../../components/TableList'
import UserService from '../../services/api/Userservice'
import { useNavigate } from 'react-router-dom'

export default function AlbumList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const colums = [
    {
      title: "Title",
      render: (row) => row.title || "-",
      key: "title",
    },
  ]

  const fetchData = async () => {
    const resp = await UserService.GetAlbumList();
    setData(resp.data)

  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Layouts.Content>
      <Pagetitle title={"Post List"} />
      <TableList data={data} columns={colums} removable={false} onClickDetail={(data) => navigate(`/albums/${data.id}`)} />
    </Layouts.Content>
  )
}
