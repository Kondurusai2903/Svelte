
<script>
    // import Counter from "./counter.svelte";
    // const counter = new Counter()
    // console.log(counter,"===>>>>>")
    import counter from "./counter.svelte";
</script>

<h1>Single Click : {counter.value}</h1>

<button onclick={counter.increment}>
    Increment 
</button>

<button onclick={counter.reset}> 
    Reset
</button>

