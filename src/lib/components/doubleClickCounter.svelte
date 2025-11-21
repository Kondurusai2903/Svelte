
<script>
    import counter from "./counter.svelte";

    // import Counter from "./counter.svelte";

    // const counter = new Counter()

    console.log(counter)

</script>

<h1>Single Click : {counter.value}</h1>
<button
  ondblclick={counter.increment}
>
 Increment 
</button>

<button ondblclick={counter.reset}> 
    Reset
</button>
