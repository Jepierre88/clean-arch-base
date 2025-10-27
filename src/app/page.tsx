
import { getAllUsersAction } from "./actions/UserActions";
import { UserList, User } from "@/src/presentation/components/UserList";

export default async  function Home() {
  const users = await getAllUsersAction();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        {users.length > 0 && <UserList users={users} />}
      </div>
    </div>
  );
}
