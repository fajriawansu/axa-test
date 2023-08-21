import { Card } from "antd";
import React, { useEffect, useState } from "react";
import Layouts from "../../components/Layouts";
import UserService from "../../services/api/Userservice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [totalUser, setTotalUser] = useState(0);
  const [totalAlbum, setTotalAlbum] = useState(0);
  const [totalPost, setTotalPost] = useState(0);

  const fetchData = async () => {
    const respUser = await UserService.GetUserList();
    setTotalUser(respUser.data?.length);
    const respPost = await UserService.GetPostList();
    setTotalPost(respPost.data?.length);
    const respAlbum = await UserService.GetAlbumList();
    setTotalAlbum(respAlbum.data?.length);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Layouts.Content>
      <div className="text-black w-full">
        <div className="text-2xl font-bold">Hi, Admin!</div>
        <div className="text-md">Here are your summary</div>
        <div className="flex mt-4 gap-2 max-sm:flex-col">
          <CardInfo title="Total Users" total={totalUser} onClick={() => navigate("/users")}  />
          <CardInfo title="Total Posts" total={totalPost} onClick={() => navigate("/posts")}  />
          <CardInfo title="Total Albums" total={totalAlbum} onClick={() => navigate("/albums")}  />
        </div>
      </div>
    </Layouts.Content>
  );
}

function CardInfo({title, total, onClick = function(){}}){
  return <div>
    <Card onClick={onClick} title={title} bordered={true} className="w-80 border-lightRed shadow-md cursor-pointer hover:bg-quaternary">
        <b className="text-2xl">{total}</b> (click to see detail)
    </Card>
  </div>
}
