import React, { useEffect, useState } from 'react'
import Pagetitle from '../../components/Pagetitle'
import Layouts from '../../components/Layouts'
import TableList from '../../components/TableList'
import UserService from '../../services/api/Userservice'
import { useNavigate } from 'react-router-dom'

export default function UserList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const colums = [
    {
      title: "Name",
      render: (row) => row.name || "-",
      key: "name",
    },
    {
      title: "Email",
      render: (row) => row.email || "-",
      key: "email",
    },
    {
      title: "Phone",
      render: (row) => row.phone || "-",
      key: "phone",
    },
    {
      title: "Website",
      render: (row) => row.website || "-",
      key: "website",
    },
  ]

  const fetchData = async () => {
    const resp = await UserService.GetUserList();
    setData(resp.data)

  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Layouts.Content>
      <Pagetitle title={"User List"} />
      <TableList removable={false} data={data} columns={colums} onClickDetail={(data) => navigate(`/users/${data.id}`)} />
    </Layouts.Content>
  )
}
