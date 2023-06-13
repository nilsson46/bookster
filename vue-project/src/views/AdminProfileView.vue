<template>
    <div> 
        <NavBarItem></NavBarItem>
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Purchases</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="user in users" :key="user.username">
                        <td> {{ user.username }}</td>
                        <td> {{user.role }}</td>
                        <td></td>
                        <td>
                            <button @click="promoteUser(user.username)">Promote</button>
                            <button @click="deleteUser(user.username)">Delete</button>
                        </td>
                    </tr>    
             </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import NavBarItem from '@/components/NavBarItem.vue';
import { getUsers, promoteUser as promoteUserRequest, deleteUser as deleteUserRequest } from '@/service/AdminService';
import { ref, onMounted } from 'vue';
import { getUserRole } from '@/components/TokenItem.vue';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

interface User {
  username: string;
  role: string;
}

export default defineComponent({
  components: {
    NavBarItem,
  },
  setup() {
    const router = useRouter();
    const isAdmin = getUserRole() === 'ADMIN';

    if (!isAdmin) {
      router.push('/library/books');
      console.log('Redirected to non-admin page');
    }

    const users = ref<User[]>([]);

    const fetchUsers = async () => {
      try {
        console.log('Sending request to retrieve users...');
        const response = await getUsers();
        console.log('Users retrieved successfully:', response);
        users.value = response.users;
        console.log('Users set in component:', users.value);
      } catch (error) {
        console.error('An error occurred while retrieving users:', error);
      }
    };

    const promoteUser = async (username: string) => {
      try {
        console.log(`Promoting user: ${username}`);
        await promoteUserRequest(username);
        console.log(`User ${username} promoted successfully`);
        
        await fetchUsers();
      } catch (error) {
        console.error(`An error occurred while promoting user ${username}:`, error);
      }
    };
    
    const deleteUser = async (username: string) => {
      try {
        console.log(`Deleting user: ${username}`);
        await deleteUserRequest(username);
        console.log(`User ${username} promoted successfully`);
        
        await fetchUsers();
      } catch (error) {
        console.error(`An error occurred while deleting user ${username}:`, error);
      }
    };
    onMounted(fetchUsers)

    return {
         users,
         isAdmin,
         promoteUser,
         deleteUser
    };
  },
});
</script>