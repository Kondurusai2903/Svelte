<script>
    import generateNotification from "$lib/utils/general-notification";

    let { children } = $props()

    // let notifications = $state.raw(generateNotification())  the main use-case of the $state.raw is if you never gonna changed the $state object then we can use the #state.raw()
    // it will not proxy the object and save the performance if you use the $state() it will be proxified and causes unneccesary value 
    
     let notifications = $state(generateNotification())

    console.log(notifications)
    const handleRemove = () => {

    }
</script>


<h1>{@render children()}</h1>
<ul>
    {#each notifications as {title,body,date}}
         {@const dateObject = new Date(date)}
        <li>
            <span>{title}</span>
            <span>{body}</span>
            <time datatime={dateObject.toISOString()}>{dateObject.toLocaleDateString()}</time>
            <div class="action">
                <button class="btn" onclick={handleRemove}>Remove</button>
            </div>

        </li>
    {:else}
       <p>No Notifications</p>
    {/each}
</ul>



<style>

ul{
    list-style-type:none;
    padding:10px;
    margin:0px;
    color:#fff;
}
li{
    margin:10px;
    background-color: #1e1e1efa;
    border:1px solid #3a3a3a;
    padding:1rem;
    border-radius:5px;
    display:flex;
    flex-direction: column;
    gap:10px;
}
.btn{
    padding:0.5rem 1rem;
    background-color: red;
    border-radius:5px;
}
.action{
    display:inline-flex;
    align-self: self-end;
}

</style>