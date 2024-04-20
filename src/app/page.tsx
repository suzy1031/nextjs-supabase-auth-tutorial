import { getSession } from "../../lib/api/server";

const Home = async () => {
  const session = await getSession();

  return (
    <div className="text-center text-xl">
      {session ? <div>ログイン済</div> : <div>未ログイン</div>}
    </div>
  );
};
export default Home;
