import UsersTable from '@/app/ui/customers/users-table';
import { fetchUsers } from '@/app/lib/data';

export default async function Page() {
  const users = await fetchUsers();
  return <UsersTable users={users} />;
}
