
<script>
  // ---------------------Parent Component -------------------------------
  //    import DebuggingInSvelte from "$lib/components/DebuggingInSvelte.svelte";
  //    <DebuggingInSvelte>Debugging In Svelte</DebuggingInSvelte>
  // ---------------------Parent Component End ----------------------------

    let { children } = $props()

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
        $inspect.trace()
        console.log(object.firstName)
        console.log(object.address.city)
    })


    // $effect(()=>{
    //     console.log(object)
    // })
    // the Above is give warning because it only depends on object not on the object.firstName or object.lastName etc...

    // alternate Approach

    // use ::: $inspect() || $state.snapshot()

    // IMP :::  $inspect() only gonna all the local intances don't run/re-run at the production server 
                //  $inspect(object).with(console.trace)

</script>

<!-- <svelte:head>
    Konduru sai
</svelte:head> -->

<h1> {@render children()}</h1>
<h2>{object.firstName}</h2>
<h2>{object.address.city}</h2>

<!-- {@debug object} this line of code actually adds a debugger to the code in inspeact we can able to see-->
<input bind:value={object.firstName} />
<input bind:value={object.address.city} />
<input bind:value={object.address.street} />
<p>{array}</p>
<button
 onclick={()=>{
    array.push(Math.floor(Math.random()*10))
 }}
>
    Add to Array
</button>

<button
 onclick = {()=>{
    console.log($state.snapshot(object))
 }}
>
    Log Snapshot
</button>

<style>

</style>