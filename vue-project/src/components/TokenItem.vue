<script lang="ts">

export function getUserRole(): string | null {
    
        const token = localStorage.getItem("accessToken")

        if(token){
        const splittedToken = token.split('.')
        const decodedToken = atob(splittedToken[1]);
        const payload = JSON.parse(decodedToken);
        return payload.role;
        } else {
            console.log("Token not found in localStorage");
            return null;
     }
        
}

</script>