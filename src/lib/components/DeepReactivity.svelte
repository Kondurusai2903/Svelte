
<script>

    let array = $state([1,2,3,4])

    let objectArray = $state([{ id : 1},{ id : 2}])

    let object = $state({
        firstName : 'Ali',
        lastName : 'Alaa',
        address:{
            city : "city",
            street: 'Street'
        }
    })

    $effect(()=>{
        console.log("Object effect")
        console.log(object)
    })

    $effect(()=>{
        console.log("object.firstName effect")
        console.log(object.firstName)
    })

    $effect(()=>{
        console.log('Object.address.city')
        console.log(object.address.city)
    })
    $effect(()=>{
        console.log('Object.address.street')
        console.log(object.address.street)
    })


    $effect(()=>{
        console.log('array');
        console.log(array)
    })

    $effect(()=>{
        console.log("array.length")
        console.log(array.length)
    })

    // $effect(()=>{
        // array.push(1) // this caused infinte update_depth_exceeds
        //Internally
        // arr[arr.length]=1
        // arr.length++
    // })

</script>

<h2>{object.firstName}</h2>
<h2>{object.address.city}</h2>


<input bind:value={object.firstName} />
<input bind:value={object.address.city} />
<input bind:value={object.address.street} />
<p>{array}</p>
<button
 onClick={()=>{
    array.push(Math.floor(Math.random()*10))
 }}
>
    Add to Array
</button>

<style>

</style>