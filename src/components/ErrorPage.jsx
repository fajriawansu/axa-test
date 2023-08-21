import { Button } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <div
      id="error-page"
      className=" w-screen h-screen bg-red-200 text-black flex justify-center items-center flex-col"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button type="text" className=" bg-softRed" onClick={() => navigate("/home")}>
        Back to Home
      </Button>
    </div>
  );
}
